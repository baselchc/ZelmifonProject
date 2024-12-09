"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../_utils/firebase-config"; // Make sure this path is correct
import { useRouter } from "next/navigation";

export default function SellPhone() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState(null);
  const [myPhones, setMyPhones] = useState([]);
  const router = useRouter();

  const user = auth.currentUser;

  const handleSubmit = async () => {
    if (!brand || !model || !description || !price || !contactNumber) {
      setError("All fields are required.");
      return;
    }
    try {
      await addDoc(collection(db, "phones"), {
        brand,
        model,
        description,
        price,
        contactNumber,
        userId: user.uid // Storing the user's ID for reference
      });
      setError(null);
      alert("Phone added successfully!");
      fetchMyPhones(); // Refresh the user's published phones
    } catch (error) {
      setError("Error adding phone: " + error.message);
    }
  };

  const fetchMyPhones = async () => {
    if (!user) return;
    const q = query(collection(db, "phones"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const phones = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMyPhones(phones);
  };

  const handleDelete = async (phoneId) => {
    try {
      const phoneRef = doc(db, "phones", phoneId);
      await deleteDoc(phoneRef);
      alert("Phone deleted successfully!");
      fetchMyPhones(); // Refresh the list of phones after deletion
    } catch (error) {
      alert("Error deleting phone: " + error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyPhones(); // Fetch the user's published phones when the component mounts
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
      <div className="bg-black/30 backdrop-blur-md p-10 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Sell a Phone</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          className="w-full p-2 mb-4 border rounded-lg text-black"
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="w-full p-2 mb-4 border rounded-lg text-black"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded-lg text-black"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full p-2 mb-4 border rounded-lg text-black"
        />
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Contact Number"
          className="w-full p-2 mb-4 border rounded-lg text-black"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white p-2 rounded-lg mb-4"
        >
          Publish Phone
        </button>
        <div className="my-phones">
          <h2 className="text-xl font-bold mb-4">My Published Phones</h2>
          {myPhones.length > 0 ? (
            <ul>
              {myPhones.map((phone) => (
                <li key={phone.id} className="mb-4 p-4 border rounded-lg bg-white shadow-md">
                  <strong className="text-black">{phone.brand} {phone.model}</strong> - <span className="text-black">${phone.price}</span>
                  <br />
                  <span className="text-black">{phone.description}</span>
                  <br />
                  <span className="text-black">Contact: {phone.contactNumber}</span>
                  <br />
                  <button
                    onClick={() => handleDelete(phone.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No phones listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
