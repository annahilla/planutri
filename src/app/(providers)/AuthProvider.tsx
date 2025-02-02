"use client";

import useAuthListener from "@/lib/hooks/useAuthListener";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useAuthListener();
  return <>{children}</>;
};

export default AuthProvider;
