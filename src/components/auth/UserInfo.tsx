"use client";

import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import ProfileItem from "../profile/ProfileItem";
import LogoutButton from "./LogoutButton";
import defaultProfile from "../../../public/default-profile.png";
import { useUser } from "@/context/UserContext";
import { FormEvent, useEffect, useState } from "react";
import Button from "../ui/buttons/Button";
import { updateUser } from "@/services/authService";
import ErrorMessage from "../ui/ErrorMessage";
import { formatDate } from "@/utils/formatDate";

const UserInfo = () => {
  const { user, updateUserInfo } = useUser();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState("");
  const [isEditableMode, setIsEditableMode] = useState(false);

  const changeEditableMode = () => {
    setIsEditableMode(!isEditableMode);
  };

  const saveUserInfo = async (event: FormEvent) => {
    event.preventDefault();

    if (username === "" || username === undefined) {
      setError("You can't leave the username empty");
      return;
    }

    const cleanedUsername = username.replace(/\s+/g, "");

    await updateUser({ name: name || "", username: cleanedUsername });
    updateUserInfo({
      name: name || "",
      username: cleanedUsername,
      email: user.email,
    });
    setIsEditableMode(false);
    setName(name);
    setUsername(cleanedUsername);
  };

  useEffect(() => {
    setError("");
  }, [name, username]);

  return (
    <form
      onSubmit={saveUserInfo}
      noValidate
      className="my-3 flex flex-col gap-5 rounded px-7 border border-neutral-200 py-6 w-full lg:w-96"
    >
      <div className="w-full flex justify-center mb-5">
        <div className="w-28 h-28 rounded-full">
          {!user ? (
            <Skeleton borderRadius={100} height="100%" width="100%" />
          ) : (
            <Image
              className="w-full rounded-full"
              width={50}
              height={50}
              alt={`${user.name} profile picture`}
              src={user.picture || defaultProfile}
              priority
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-4">
        <ProfileItem
          isLoading={!user}
          item="Name"
          value={name}
          setValue={setName}
          isEditableMode={isEditableMode}
          changeEditableMode={changeEditableMode}
          editable
        />
        <ProfileItem
          isLoading={!user}
          item="Username"
          value={username}
          setValue={setUsername}
          isEditableMode={isEditableMode}
          changeEditableMode={changeEditableMode}
          editable
        />
        <ProfileItem isLoading={!user} item="Email" value={user.email} />
        <ProfileItem
          isLoading={!user}
          item="Joined"
          value={user.createdAt ? formatDate(user.createdAt) : ""}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex flex-col gap-4 my-3 w-full">
        {isEditableMode && (
          <div className="flex gap-2">
            <Button handleClick={() => setIsEditableMode(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        )}
        <LogoutButton />
      </div>
    </form>
  );
};

export default UserInfo;
