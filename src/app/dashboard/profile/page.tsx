"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Button from "@/components/ui/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import { logoutUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const user = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <div>
      <div className="mb-4 md:mb-6">
        <PageTitle>Profile</PageTitle>
      </div>
      <div className="my-3 flex flex-col gap-4 rounded px-7 border border-neutral-200 py-6 w-full lg:w-96">
        {user?.name && (
          <div className="flex gap-2">
            <p className="font-bold">Name:</p>
            <p>{user?.name}</p>
          </div>
        )}
        <div className="flex gap-2">
          <p className="font-bold">Email:</p>
          <p>{user?.email}</p>
        </div>
        {user?.joined && (
          <div className="flex gap-2">
            <p className="font-bold">Joined:</p>
            <p>{user?.joined}</p>
          </div>
        )}
        <div className="my-4 w-full">
          <Button color="white" filled handleClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
