import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    legacy({ targets: ['defaults', 'not IE 11'] })
  ],
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        protocolos: resolve(__dirname, 'pages/protocolos.html'),
        artigos: resolve(__dirname, 'pages/artigos.html'),
        eventos: resolve(__dirname, 'pages/eventos.html'),
        noticias: resolve(__dirname, 'pages/noticias.html'),
        sobre: resolve(__dirname, 'pages/sobre.html'),
        contato: resolve(__dirname, 'pages/contato.html'),
        busca: resolve(__dirname, 'pages/busca.html'),
        'protocolo-itu': resolve(__dirname, 'pages/protocolo/infeccao-do-trato-urinario.html'),
        'protocolo-iue': resolve(__dirname, 'pages/protocolo/incontinencia-urinaria-esforco.html'),
        'protocolo-iun': resolve(__dirname, 'pages/protocolo/incontinencia-urinaria-nao.html'),
        'protocolo-sbh': resolve(__dirname, 'pages/protocolo/sindrome-bexiga-hiperativa.html'),
        'artigo-acupuntura': resolve(__dirname, 'pages/artigo/acupuntura-urinaria-feminina.html'),
        'artigo-cirurgias': resolve(__dirname, 'pages/artigo/cirurgias-incontinencia.html'),
        'artigo-revi': resolve(__dirname, 'pages/artigo/revi-literaria-artigo.html'),
        'artigo-revisao': resolve(__dirname, 'pages/artigo/revisao-ssistematica.html'),
        'artigo-basica': resolve(__dirname, 'pages/artigo/urinaria-atencao-basica.html'),
      }
    }
  }
});
