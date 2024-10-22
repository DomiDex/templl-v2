import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeAiModal } from '../redux/templateSlice';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-002',
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
});

export default function AiFormModal() {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const chatSession = model.startChat({
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      setAiResponse(result.response.text());
    } catch (error) {
      console.error('Error generating AI response:', error);
      setAiResponse(
        'An error occurred while generating the response. Please try again.'
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse);
    dispatch(closeAiModal());
  };

  return (
    <div className='fixed inset-0 bg-darkPurple bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-lightGray rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-bold text-darkPurple'>AI Assistant</h2>
          <button
            onClick={() => dispatch(closeAiModal())}
            className='text-darkPurple hover:text-purple transition-colors duration-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='prompt'
              className='block text-sm font-medium text-darkPurple mb-1'
            >
              Enter your prompt
            </label>
            <textarea
              id='prompt'
              name='prompt'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows='4'
              className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
              placeholder='Enter your prompt here...'
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full bg-purple text-white py-2 px-4 rounded-md hover:bg-lightPurple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
          >
            Generate
          </button>
        </form>
        {aiResponse && (
          <div className='mt-6'>
            <h3 className='text-xl font-bold text-darkPurple mb-2'>
              AI Response
            </h3>
            <div className='bg-white border border-darkGray rounded-md p-4 mb-4'>
              <p className='text-darkPurple'>{aiResponse}</p>
            </div>
            <button
              onClick={handleCopy}
              className='bg-purple text-white py-2 px-4 rounded-md hover:bg-lightPurple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
            >
              Copy Response
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
