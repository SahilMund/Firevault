import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updatePassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);


  function signup(email, password) {
    setCurrentUser(null)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    // setCurrentUser(auth.currentUser)
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;

    console.log(currentPassword, user.email);

    const credentials = //auth.EmailAuthProvider.credential()
      EmailAuthProvider.credential(user.email, currentPassword);

    return reauthenticateWithCredential(user, credentials);
  };

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    AuthContext,
    currentUser,
    login,
    signup,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    logout,
    setCurrentUser,
    reauthenticate,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
