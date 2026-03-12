/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '*.html',
    'pages/**/*.html',
    'components/**/*.html',
    'assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        uro: {
          azul_escuro: '#1e40af',
          azul: '#3b82f6',
          azul_claro: '#60a5fa',
          branco: '#ffffff',
          cinza: '#f3f4f6',
          cinza_escuro: '#6b7280'
        }
      }
    }
  },
  plugins: [],
};
