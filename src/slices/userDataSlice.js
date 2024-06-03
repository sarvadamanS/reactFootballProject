import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    "User Name": "Sarvadaman Singh",
    "Favorite club": "Real Madrid",
    "Favorite Player": "Jude",
    "Jersey Number": "7",
    "Started Following": "2014",
  },
  profilePic: {
    id: "001",
  },
  isloggedIn: true,
  token: null,
};
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      console.log(state, action);
      state.value = action.payload;
    },
    updateProfilePic: (state, action) => {
      console.log(state, action);
      state.profilePic.id = action.payload;
    },
    login: (state, action) => {
      console.log("logged in");
      state.isloggedIn = true;
    },
    logout: (state, action) => {
      console.log("logged out");
      state.isloggedIn = false;
    },
    setToken(state, action) {
      state.token = action.payload;
      sessionStorage.setItem("token", action.payload); // Store token in session storage
    },
    clearToken(state) {
      state.token = null;
      sessionStorage.removeItem("token"); // Remove token from session storage
    },
  },
});
console.log("Initial State:", userDataSlice.initialState);

// Action creators are generated for each case reducer function
export const {
  updateUserData,
  updateProfilePic,
  login,
  logout,
  setToken,
  clearToken,
} = userDataSlice.actions;

export const selectToken = (state) => state.userData.token;
export default userDataSlice.reducer;
