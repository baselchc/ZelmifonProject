"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../_utils/firebase-config"; // Ensure this points to your firebase config
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const handleSignUp = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/homepage"); // Redirect to home page after sign-up
    } catch (error) {
      setError("Error signing up: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/"); // Redirect to home page after sign-up
    } catch (error) {
      setError("Error signing up with Google: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Blurred container */}
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mb-4"
        >
          Sign Up
        </button>
        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-red-500 text-white p-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Image
            src="/images/google-logo.png" // Ensure you have a Google logo image
            alt="Google Logo"
            width={20}
            height={20}
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
