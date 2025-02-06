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
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const userData = { name: user.displayName, email: user.email!, token }
                dispatch(setUser(userData));
            } else {
                dispatch(logout());
            }
            setLoading(false);  
        });

        return () => unsubscribe();
    }, [dispatch]);

    return loading;
}

export default useAuthListener;
