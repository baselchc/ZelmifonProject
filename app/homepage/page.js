"use client";

import { signOut } from "firebase/auth";
import { auth } from "../_utils/firebase-config"; // Adjust path as needed
import { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure you're using the correct useRouter import
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user] = useState(auth.currentUser); // Assuming auth is set up correctly
  const router = useRouter(); // For navigation

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/"); // Redirect to the sign-in page after logging out
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Centered logo */}
      <div className="flex justify-center items-center pt-8">
        <Image
          src="/images/ZelmifonLogo.png" // Ensure you have the logo here
          alt="Zelmifon logo"
          width={200}
          height={50}
        />
      </div>

      {/* Tabs below the logo */}
      <div className="flex justify-center items-center gap-8 mt-8">
        <button onClick={() => router.push("/phonesforSale")} className="px-6 py-2 bg-blue-500 text-white rounded-lg">
          Phones for Sale
        </button>
        <button onClick={() => router.push("/sellaPhone")} className="px-6 py-2 bg-green-500 text-white rounded-lg">
          Sell a Phone
        </button>
      </div>

      {/* User info on the top right */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-gray-200 p-2 rounded-md">
            {user?.displayName}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
              <div
                onClick={() => {
                  setMenuOpen(false);
                  console.log("Edit Profile");
                }}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
              >
                Edit Profile
              </div>
              <div
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
