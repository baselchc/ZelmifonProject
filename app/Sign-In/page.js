"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../_utils/firebase-config"; // Ensure this points to your firebase config
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/homepage"); // Redirect to home page
    } catch (error) {
      setError("Error signing in: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/homepage"); // Redirect to home page
    } catch (error) {
      setError("Error signing in with Google: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Blurred container */}
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
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
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mb-4"
        >
          Sign In
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white p-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Image
            src="/images/google-logo.png" // Make sure you have a Google logo image in your public folder
            alt="Google Logo"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
