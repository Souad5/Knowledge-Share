import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/Firebase.init";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Register a new user
  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (profile) => {
    if (auth.currentUser) {
      return await updateProfile(auth.currentUser, profile);
    }
  };

  // Login with email and password
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await result.user.getIdToken();
      localStorage.setItem("token", firebaseToken);

      // Fetch backend JWT using user email
      const response = await axios.post("https://assignment-11-black.vercel.app/jwt", { email: result.user.email });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        setToken(null);
        localStorage.removeItem("token");
      }

      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();
      localStorage.setItem("token", firebaseToken);

      // Fetch backend JWT using user email
      const response = await axios.post("https://assignment-11-black.vercel.app/jwt", { email: result.user.email });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        setToken(null);
        localStorage.removeItem("token");
      }

      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken();
        setToken(token);
        localStorage.setItem("token", token);
        // Also fetch backend JWT
        axios.post("https://assignment-11-black.vercel.app/jwt", { email: currentUser.email })
          .then((response) => {
            if (response.data.token) {
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token);
            } else {
              setToken(null);
              localStorage.removeItem("token");
            }
          });
      } else {
        setToken(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    token,
    registerUser,
    updateUserProfile,
    loginUser,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
