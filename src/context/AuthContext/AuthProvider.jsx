import React, { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.info";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register With Email and Password
  const handelRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login With Email and Password
  const handelLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Register With Google
  const handelGoogleRegister = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign Out User
  const handelSignOut = () => {
    setLoading(true);
    toast.success("Log Out Successfully", { id: "logout" });
    return signOut(auth);
  };

  // Update user profile
  const updateUser = (name, photo) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return updateProfile(currentUser, {
        displayName: name,
        photoURL: photo,
      }).then(() => {
        setUser({
          ...currentUser,
          displayName: name,
          photoURL: photo,
        });
      });
    }
  };

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        const { data } = await axios
          .post("https://car-rental-server-tawny.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {

            setLoading(false);
          });
      } else {
        const { data } = await  axios
          .get(
            "https://car-rental-server-tawny.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setLoading(false);
          });
      }
    });

    // Cleanup the auth listener when component is unmounted
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    handelRegister,
    handelGoogleRegister,
    handelLogin,
    handelSignOut,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
