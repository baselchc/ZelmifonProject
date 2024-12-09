import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Replace with a secure key, store in an environment variable

export async function POST(req) {
  const { userId } = await req.json();

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
  }

  try {
    // Generate JWT token
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error generating token: " + error.message }), { status: 500 });
  }
}
