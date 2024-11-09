/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5F6FFF", // Warna biru utama
        plantGreen: '#4CAF50', // Hijau cerah
        lightGreen: '#81C784', // Hijau muda
        soilBrown: '#8D6E63', // Coklat tanah
        softCream: '#F5F5DC', // Krem lembut
        goldenYellow: '#FFD54F', // Kuning padi
      },
    },
  },
  plugins: [],
};
