"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser, logout } from "@/lib/store/auth/authSlice";

const useAuthListener = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const userData = { name: user.displayName, email: user.email!, token };
                dispatch(setUser(userData));
            } else {
                dispatch(logout());
            }
            setLoading(false);
        });

        const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken(true); 
                dispatch(setUser({ name: user.displayName, email: user.email!, token }));
            }
        });

        return () => {
            unsubscribeAuth();
            unsubscribeToken();
        };
    }, [dispatch]);

    return loading;
};

export default useAuthListener;
