/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from "daisyui"

export default withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#3E7CB1",
                secondary: "#F2A65A",
                background: "#FFFFFF",
                text: "#4A4A4A",
                accent: "#7FB285",
            },
            fontFamily: {
                sans: ["Airbnb Cereal App", "Helvetica", "Arial", "sans-serif"],
            },
            boxShadow: {
                card: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                cardHover:
                    "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
                sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08)",
                lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    plugins: [
        daisyui,
    ],
});
