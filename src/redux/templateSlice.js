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
      const response = await axios.get(API_URL);
      return response.data.rows;
    } catch (error) {
      console.error('Error fetching templates:', error);
      return rejectWithValue(error.message || 'Failed to fetch templates');
    }
  }
);

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    templates: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default templateSlice.reducer;
