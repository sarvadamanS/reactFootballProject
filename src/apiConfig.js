// apiConfig.js

export const API_URL = window.location.origin.includes("localhost")
  ? "http://localhost:3001"
  : window.location.origin;
console.log(API_URL);
