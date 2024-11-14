/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                inter: ["Poppins", "sans-serif"],
            },
            screens: {
                "2xl": { max: "1535px" },
                // => @media (max-width: 1535px) { ... }

                xl: { max: "1279px" },
                // => @media (max-width: 1279px) { ... }

                lg: { max: "1024px" },
                // => @media (max-width: 1024px) { ... }

                md: { max: "800px" },
                // => @media (max-width: 800px) { ... }

                sm: { max: "650px" },
                // => @media (max-width: 650px) { ... }

                xs: { max: "400px" },
                // => @media (max-width: 400px) { ... }
            },
        },
    },
    plugins: [],
};
