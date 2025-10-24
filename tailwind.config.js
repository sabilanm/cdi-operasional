/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                playfair: ["Playfair Display", "serif"],
                crimson: ['"Crimson Text"', "serif"],
                cinzel: ['"Cinzel"', "serif"],
                lora: ['"Lora"', "serif"],
                lobster: ['"Lobster"', "cursive"],
                quattro: ['"Quattrocento"', "serif"],
            },
        },
    },
    plugins: [],
};
