/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'noto' : '"Noto Sans", sans-serif',
    },
    extend: {
      backgroundImage: {
        'login' : "url('/images/login_img.jpg')",
        'register' : "url('/images/register_img.jpg')"
      },
      gridTemplateColumns: {
        'login' : '1fr 450px',
        'register' : '450px 1fr',
        'layout' : '250px 1fr'
      },
      gridTemplateRows : {
        'layout' : '88px 1fr'
      }
    },
  },
  plugins: [],
}
