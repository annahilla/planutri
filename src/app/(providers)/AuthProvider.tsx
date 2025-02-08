"use client";

import Loading from "@/components/ui/Loading";
import useAuthListener from "@/lib/firebase/hooks/useAuthListener";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return useAuthListener() ? <Loading /> : <>{children}</>;
};

export default AuthProvider;
