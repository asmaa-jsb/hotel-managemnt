// src/redux/authSlice.ts
import CookieServices from "@/services/CookieServices/CookieServices";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  _id: string;
  role: string;
}

interface AuthState {
  loginData: DecodedToken | null;
}

const initialState: AuthState = {
  loginData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLoginData: (state) => {
      const token = CookieServices.get("token");

      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          state.loginData = decoded;
        } catch (error) {
          console.error("Invalid token:", error);
          state.loginData = null;
        }
      }
    },
    clearLoginData: (state) => {
      state.loginData = null;
    },
  },
});

export const { saveLoginData, clearLoginData } = authSlice.actions;
export default authSlice.reducer;
