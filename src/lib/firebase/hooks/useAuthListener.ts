"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser, logout } from "@/lib/store/auth/authSlice";
import { refreshToken } from "@/services/authService";
import { getCookie, setCookie } from "cookies-next";

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

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = getCookie("token");
      const refreshTokenValue = await getCookie("refreshToken");

      if (!token && refreshTokenValue) {
        const newTokenData = await refreshToken(refreshTokenValue);

        if (!newTokenData) return;

        if (newTokenData) {
          setCookie("token", newTokenData.idToken, { maxAge: 60 * 60 });
          setCookie("refreshToken", newTokenData.refreshToken, { maxAge: 60 * 60 * 24 * 30 });
        } else {
        dispatch(logout());
        setCookie("token", "", { maxAge: -1 });
        setCookie("refreshToken", "", { maxAge: -1 });
      }

      }
    };

    checkAndRefreshToken();
  }, []);


    return loading;
};

export default useAuthListener;
