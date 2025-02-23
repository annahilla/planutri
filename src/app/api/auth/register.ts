import { authService } from './authService';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth'; 

export const POST = async (req: NextRequest) => {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { email, isAdmin } = await req.json();

    const userService = new authService();
    const user = await userService.registerUser(userId, email, isAdmin);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error during user registration:", error);
    return new NextResponse("Error during registration", { status: 500 });
  }
};
