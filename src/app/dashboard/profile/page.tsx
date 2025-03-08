import DashboardHeader from "@/components/ui/DashboardHeader";
import PageTitle from "@/components/ui/PageTitle";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import UserInfo from "@/components/profile/UserInfo";

const ProfilePage = async () => {
  return (
    <div>
      <DashboardHeader>
        <PageTitle>Profile</PageTitle>
      </DashboardHeader>
      <UserInfo />
    </div>
  );
};

export default ProfilePage;
