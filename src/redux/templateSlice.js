import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

const API_URL = 'http://localhost:3000/templates';
const TIMEOUT_MS = 10000;
const MAX_RETRIES = 3;

const fetchWithTimeout = (url, options, timeout) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const { signal } = controller;

    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timed out'));
    }, timeout);

    fetch(url, { ...options, signal })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

const publishTemplateWithRetry = async (templateWithUrls, retries = 0) => {
  try {
    const response = await fetchWithTimeout(
      API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateWithUrls),
      },
      TIMEOUT_MS
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`Retrying request (${retries + 1}/${MAX_RETRIES})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (retries + 1)));
      return publishTemplateWithRetry(templateWithUrls, retries + 1);
    }
    throw error;
  }
};

export const publishTemplate = createAsyncThunk(
  'templates/publish',
  async (templateData, { rejectWithValue }) => {
    try {
      // Upload images to Firebase Storage
      const mainImageRef = ref(
        storage,
        `templates/${templateData.name}/mainImage`
      );
      const thumbnailRef = ref(
        storage,
        `templates/${templateData.name}/thumbnail`
      );

      const [mainImageSnapshot, thumbnailSnapshot] = await Promise.all([
        uploadBytes(mainImageRef, templateData.image_main),
        uploadBytes(thumbnailRef, templateData.image_thumbnail),
      ]);

      const [mainImageUrl, thumbnailUrl] = await Promise.all([
        getDownloadURL(mainImageSnapshot.ref),
        getDownloadURL(thumbnailSnapshot.ref),
      ]);

      const templateWithUrls = {
        ...templateData,
        image_main: mainImageUrl,
        image_thumbnail: thumbnailUrl,
      };

      console.log(
        'Sending data to API:',
        JSON.stringify(templateWithUrls, null, 2)
      );

      // const response = await axios.get(`http://localhost:3000/templates`);
      // console.log(response);
      const result = await publishTemplateWithRetry(templateWithUrls);
      console.log('API response:', result);

      console.log(mainImageUrl);
      console.log(thumbnailUrl);
      console.log('anything');
      return 'result';
    } catch (error) {
      console.error('Error publishing template:', error);
      return rejectWithValue(
        error.message || 'An error occurred while publishing the template'
      );
    }
  }
);

// New action to fetch templates
export const fetchTemplates = createAsyncThunk(
  'templates/fetchTemplates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      const data = await response.json();
      return data.rows;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New action to delete a template
export const deleteTemplate = createAsyncThunk(
  'templates/deleteTemplate',
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${templateId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete template');
      }
      return templateId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const openEditModal = createAsyncThunk(
  'templates/openEditModal',
  async (template, { dispatch }) => {
    dispatch(setEditingTemplate(template));
    return template;
  }
);

export const updateTemplate = createAsyncThunk(
  'templates/updateTemplate',
  async (updatedTemplate, { rejectWithValue }) => {
    try {
      let mainImageUrl = updatedTemplate.image_main;
      let thumbnailUrl = updatedTemplate.image_thumbnail;

      // Upload new images if provided
      if (updatedTemplate.mainImage) {
        const mainImageRef = ref(
          storage,
          `templates/${updatedTemplate.name}/mainImage`
        );
        const mainImageSnapshot = await uploadBytes(
          mainImageRef,
          updatedTemplate.mainImage
        );
        mainImageUrl = await getDownloadURL(mainImageSnapshot.ref);
      }

      if (updatedTemplate.thumbnailImage) {
        const thumbnailRef = ref(
          storage,
          `templates/${updatedTemplate.name}/thumbnail`
        );
        const thumbnailSnapshot = await uploadBytes(
          thumbnailRef,
          updatedTemplate.thumbnailImage
        );
        thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);
      }

      const templateWithUrls = {
        ...updatedTemplate,
        image_main: mainImageUrl,
        image_thumbnail: thumbnailUrl,
      };

      const response = await axios.put(
        `${API_URL}/${updatedTemplate.id}`,
        templateWithUrls
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    templates: [],
    loading: false,
    error: null,
    editingTemplate: null,
    isEditModalOpen: false,
  },
  reducers: {
    setEditingTemplate: (state, action) => {
      state.editingTemplate = action.payload;
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.editingTemplate = null;
      state.isEditModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.templates.push(action.payload);
      })
      .addCase(publishTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = state.templates.filter(
          (template) => template.id !== action.payload
        );
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(openEditModal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(openEditModal.fulfilled, (state, action) => {
        state.loading = false;
        state.editingTemplate = action.payload;
      })
      .addCase(openEditModal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = state.templates.map((template) =>
          template.id === action.payload.id ? action.payload : template
        );
        state.editingTemplate = null;
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default templateSlice.reducer;

export const { setEditingTemplate, closeEditModal } = templateSlice.actions;
