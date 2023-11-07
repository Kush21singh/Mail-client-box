// import { createSlice } from "@reduxjs/toolkit";

// const isLogIn = localStorage.getItem("localId");
// let initialAuthState = { isAuthenticate: false };

// if (isLogIn === "" || !isLogIn) {
//   initialAuthState = { isAuthenticate: false };
// } else {
//   initialAuthState = { isAuthenticate: true };
// }

// const AuthSlice = createSlice({
//   name: "authStateChange",
//   initialState: initialAuthState,
//   reducers: {
//     logIn(state) {
//       state.isAuthenticate = true;
//     },
//     logOut(state) {
//       state.isAuthenticate = false;
//     },
//   },
// });

// export const authActions = AuthSlice.actions;
// export default AuthSlice;