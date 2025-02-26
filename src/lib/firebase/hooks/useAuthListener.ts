"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser, logout } from "@/lib/store/auth/authSlice";

const useAuthListener = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const token = await user.getIdToken(true);
            dispatch(setUser({
                name: user.displayName, 
                email: user.email!, 
                joined: user.metadata.creationTime, 
                token 
            }));
        } else {
            dispatch(logout());
        }
        setLoading(false);
    });
    return () => {
        unsubscribeAuth();
    };
}, [dispatch]);


    return loading;
};

export default useAuthListener;
