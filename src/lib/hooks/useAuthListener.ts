"use client"

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { setUser, logout } from "../store/auth/authSlice";

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) {
                const token = await user.getIdToken();
                const userData = { name: user.displayName, email: user.email!, token }
                dispatch(setUser(userData));
            } else {
                dispatch(logout())
            }
        });

        return () => unsubscribe();
    }, [dispatch])
}

export default useAuthListener;