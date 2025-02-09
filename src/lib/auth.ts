import admin from '@/lib/firebase/firebaseAdmin';
import { NextRequest } from 'next/server';

export const verifyToken = async (req: NextRequest) => {    
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};