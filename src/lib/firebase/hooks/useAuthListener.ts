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
            const token = await user.getIdToken(true);
            console.log("onAuthStateChanged token: ", token);
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

    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
        if (user) {
            const token = await user.getIdToken(true);
            console.log("onIdTokenChanged token: ", token);
            dispatch(setUser({
                name: user.displayName, 
                email: user.email!, 
                joined: user.metadata.creationTime, 
                token 
            }));
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
