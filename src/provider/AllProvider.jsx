import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";
import AllContext from "../contexts/AllContext";

const AllProvider = ({ children }) => {
  //## States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //## Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //## Update User
  const updateUser = (displayName, photoURL) => {
    const profileData = { displayName, photoURL };
    return updateProfile(auth.currentUser, profileData);
  };

  //## Login with Password
  const loginWithPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //## Login with Pop Up
  const loginWithPopUp = (provider) => {
    return signInWithPopup(auth, provider);
  };

  //## Logout
  const logoutUser = () => {
    return signOut(auth);
  };

  //## Observer- Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  //%% Dark Mode Setup
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const info = {
    darkMode,
    toggleDarkMode,
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    updateUser,
    loginWithPassword,
    loginWithPopUp,
    logoutUser,
  };
  return <AllContext.Provider value={info}>{children}</AllContext.Provider>;
};
AllProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AllProvider;
