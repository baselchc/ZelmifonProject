"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_utils/firebase-config"; // Make sure this path is correct

export default function PhonesForSale() {
  const [phones, setPhones] = useState([]);

  const fetchPhones = async () => {
    const querySnapshot = await getDocs(collection(db, "phones"));
    const allPhones = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPhones(allPhones);
    console.log(allPhones); // Log the phones to the console after fetching
  };

  useEffect(() => {
    fetchPhones(); // Fetch all phones when the component mounts
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-black/30 backdrop-blur-md p-10 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Phones for Sale</h1>
        {phones.length > 0 ? (
          <ul>
            {phones.map((phone) => (
              <li key={phone.id}>
                <strong>{phone.brand} {phone.model}</strong> - ${phone.price}
                <br />
                {phone.description}
                <br />
                Contact: {phone.contactNumber}
              </li>
            ))}
          </ul>
        ) : (
          <p>No phones available for sale at the moment.</p>
        )}
      </div>
    </div>
  );
}
