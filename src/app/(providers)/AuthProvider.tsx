"use client";

import Loading from "@/components/ui/Loading";
import useAuthListener from "@/lib/firebase/hooks/useAuthListener";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const loading = useAuthListener();

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthProvider;
