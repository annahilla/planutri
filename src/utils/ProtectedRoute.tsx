"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  canActivate: boolean;
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoute = ({
  canActivate,
  redirectPath,
  children,
}: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!canActivate) {
      router.push(redirectPath);
    }
  }, [canActivate, redirectPath, router]);

  if (!canActivate) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
