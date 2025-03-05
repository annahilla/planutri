import connect from "@/database/db";
import { getUserId } from "../auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/database/models/user";
import { usernameService } from "./usernameService";
import admin from "@/lib/firebase/firebaseAdmin";

export const GET = async () => {
    try {
        const userId = await getUserId();
        await connect();
        const user = await User.find({userId});
        return new NextResponse(JSON.stringify(user), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error getting user data" + error.message, {
            status: 500,
        })
    }
}

export const POST = async (req: NextRequest) => {
    try{
        const { idToken, name, email } = await req.json();

        if (!idToken) {
            return new NextResponse(JSON.stringify({error: "ID token required"}), { status: 400 });
        }

        const userId = (await admin.auth().verifyIdToken(idToken)).uid;
        
        if (!email) {
            return new NextResponse("Required fields are missing", { status: 400 });
        }

        const userService = new usernameService();
        const username = await userService.generateUsername();

        const newUser = new User({
            firebaseUid: idToken,
            name,
            email,
            username,
            userId
        });

        await newUser.save();

        return new NextResponse(JSON.stringify({message: "Logged In"}), { status: 200 });
    } catch (error) {
        console.error("Session login error:", error);
        return new NextResponse(JSON.stringify({error: "Session login error"}), { status: 401 });
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const userId = await getUserId();
        await connect();

        const { name, username, picture } = await req.json();

        if (!username) {
            return NextResponse.json({message: "Required fields are missing"}, { status: 400 });
        }

        const cleanedUsername = username.replace(/\s+/g, '');

        const existingUser = await User.findOne({ username: cleanedUsername });

        if (existingUser && existingUser.userId !== userId) {
            return NextResponse.json({ message: "Username already taken" }, { status: 409 });
        }

        const updatedUser = await User.findOneAndUpdate({userId}, {
            name,
            username: cleanedUsername,
            picture,
            userId
        }, {new: true});

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}