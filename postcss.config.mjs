// postcss.config.mjs (CORRETO para Tailwind v4 com @tailwindcss/postcss)
const config = {
    plugins: {
      "@tailwindcss/postcss": {}, // <<< Use o nome exato do pacote instalado
      autoprefixer: {}, // (Opcional, mas recomendado) Você pode adicionar o autoprefixer aqui depois se precisar
    },
  };
  export default config;