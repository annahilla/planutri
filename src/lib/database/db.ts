import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = await mongoose.connection.readyState;

    if(connectionState === 1) {
        console.log("Already connected");
        return;
    }

    if(connectionState === 2) {
        console.log("Connecting...");
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: "plantry-api",
            bufferCommands: true
        });
        console.log("Connected");
    } catch(error: any) {
        console.log("Error", error);
        throw new Error("Error: ", error)
    }
}

export default connect;