/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Se você tiver a pasta pages
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // ESSENCIAL para o App Router
    ],
    theme: {
        extend: {
            fontFamily: { // Adiciona ou estende fontFamily
                sans: ['var(--font-geist-sans)', 'sans-serif'], // Mapeia para font-sans
                mono: ['var(--font-geist-mono)', 'monospace'],  // Mapeia para font-mono
            },
        },
    },
    plugins: [],
}
