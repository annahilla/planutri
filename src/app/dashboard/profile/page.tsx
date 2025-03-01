"use client";

import Button from "@/components/ui/buttons/Button";
import DashboardHeader from "@/components/ui/DashboardHeader";
import PageTitle from "@/components/ui/PageTitle";
import { getUser, logoutUser } from "@/services/authService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfilePage = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.removeQueries({ queryKey: ["user"] });
    router.push("/");
  };

  return (
    <div>
      <DashboardHeader>
        <PageTitle>Profile</PageTitle>
      </DashboardHeader>
      <div className="my-3 flex flex-col gap-5 rounded px-7 border border-neutral-200 py-6 w-full lg:w-96">
        <div className="w-full flex justify-center mb-5">
          <div className="w-28 h-28 rounded-full">
            {isLoading ? (
              <Skeleton borderRadius={100} height="100%" width="100%" />
            ) : (
              user?.picture && (
                <Image
                  className="w-full rounded-full"
                  width={50}
                  height={50}
                  alt={`${user.name} profile picture`}
                  src={user.picture}
                  priority
                />
              )
            )}
          </div>
        </div>
        <div className="w-full h-5">
          <div className="w-full h-full">
            {isLoading ? (
              <Skeleton height="100%" width="100%" />
            ) : (
              <div className="flex gap-2 items-center w-full">
                <p className="font-bold">Name:</p>
                <p>{user?.name}</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-5">
          <div className="w-full h-full">
            {isLoading ? (
              <Skeleton height="100%" width="100%" />
            ) : (
              <div className="flex gap-2 items-center w-full">
                <p className="font-bold">Email:</p>
                <p>{user?.email}</p>
              </div>
            )}
          </div>
        </div>

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
