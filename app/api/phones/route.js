import jwt from "jsonwebtoken";
import { db } from "../../_utils/firebase-config"; // Adjust path as necessary
import { doc, setDoc, updateDoc, deleteDoc, addDoc, collection, getDocs, getDoc } from "firebase/firestore";

const SECRET_KEY = "your_secret_key"; // Use a secure key stored in environment variables

export async function POST(req) {
  // Validate the token
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, SECRET_KEY); // Verify the token
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 403 });
  }

  // Process the request data
  const data = await req.json();
  const phones = Array.isArray(data) ? data : [data];

  if (phones.length === 0) {
    return new Response(
      JSON.stringify({ error: "Request body must be a non-empty array of phone objects" }),
      { status: 400 }
    );
  }

  try {
    const results = await Promise.all(
      phones.map(async (phone) => {
        const { brand, model, description, price, contactNumber, userId } = phone;

        if (!brand || !model || !description || !price || !contactNumber || !userId) {
          throw new Error("Each phone object must contain all required fields");
        }

        const phoneRef = await addDoc(collection(db, "phones"), {
          brand,
          model,
          description,
          price,
          contactNumber,
          userId,
        });

        return { id: phoneRef.id, message: `${brand} ${model} added successfully` };
      })
    );

    return new Response(JSON.stringify({ message: "All phones added successfully", results }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating phones: " + error.message }), { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY); // Verify token
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 403 });
    }

    // Extract phone ID from request body
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Phone ID is required" }), { status: 400 });
    }

    // Check if the phone exists and delete it
    const phoneRef = doc(db, "phones", id);
    const phoneDoc = await getDoc(phoneRef);

    if (!phoneDoc.exists()) {
      return new Response(JSON.stringify({ error: "Phone does not exist" }), { status: 404 });
    }

    await deleteDoc(phoneRef);
    return new Response(JSON.stringify({ message: "Phone deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting phone: " + error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  const { id, brand, model, description, price, contactNumber } = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ error: "Phone ID is required" }), { status: 400 });
  }

  try {
    const phoneRef = doc(db, "phones", id);
    await updateDoc(phoneRef, {
      brand,
      model,
      description,
      price,
      contactNumber,
    });

    return new Response(JSON.stringify({ message: "Phone updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating phone: " + error.message }), { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url); 
  const id = searchParams.get("id"); 
  try {
    if (id) {

      const phoneRef = doc(db, "phones", id);
      const phoneDoc = await getDoc(phoneRef);

      if (!phoneDoc.exists()) {
        return new Response(
          JSON.stringify({ error: "Phone not found" }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({ phone: { id: phoneDoc.id, ...phoneDoc.data() } }),
        { status: 200 }
      );
    } else {

      const querySnapshot = await getDocs(collection(db, "phones"));
      const phones = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return new Response(JSON.stringify({ phones }), { status: 200 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching data: " + error.message }),
      { status: 500 }
    );
  }
}


