/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{html,js,jsx}",
  'node_modules/flowbite-react/lib/esm/**/*.{js,jsx,html}',
],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: ["light", "dark", "cupcake"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode utils: true, // adds responsive and modifier utility classes
  
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  
  
  plugins: [
    require("daisyui"),
    require('flowbite/plugin'),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")
    
  ],
}