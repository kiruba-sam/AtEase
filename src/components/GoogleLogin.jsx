import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase"; // Import Firebase from firebase.js
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/AtEaseFit/dashboard"; // Redirect after login
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-md text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {user ? `Welcome, ${user.displayName}` : "Login with Google"}
        </h2>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default GoogleLogin;
