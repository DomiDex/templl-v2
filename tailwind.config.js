/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      para: "'PP Radio Grotesk'",
      heading: "'PP Mori'",
    },
    colors: {
      lightGray: '#F2F2F2',
      darkerGray: '#E6E5E8',
      lightPurple: '#726170',
      purple: '#4F394C',
      darkPurple: '#474554',
      darkGray: '#B6B6B6',
      hoverGray: '#DADADD',
      white: '#FFFFFF',
      'red-500': '#FF4332',
    },
    extend: {},
  },
};
