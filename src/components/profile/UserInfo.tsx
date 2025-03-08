"use client";

import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import ProfileItem from "./ProfileItem";
import LogoutButton from "../auth/LogoutButton";
import defaultProfile from "../../../public/default-profile.png";
import { useUser } from "@/context/UserContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../ui/buttons/Button";
import { updateUser, uploadUserImage } from "@/services/authService";
import ErrorMessage from "../ui/ErrorMessage";
import { formatDate } from "@/utils/formatDate";
import { ClipLoader } from "react-spinners";

const UserInfo = () => {
  const { user, updateUserInfo } = useUser();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState("");
  const [isEditableMode, setIsEditableMode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    user.picture || defaultProfile.src
  );
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

    try {
      await updateUser({
        name: name || "",
        username: cleanedUsername,
        picture: imageUrl || "",
      });
      updateUserInfo({
        name: name || "",
        username: cleanedUsername,
        email: user.email,
      });
      setIsEditableMode(false);
      setName(name);
      setUsername(cleanedUsername);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === "Username already taken") {
        setError("This username is already taken.");
      } else {
        setError("There was an error updating your profile.");
      }
    }
  };

  const handleImageClick = () => {
    if (!isEditableMode) {
      setIsEditableMode(true);
    }
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

    if (!file) {
      setError("Please select an image first.");
      return;
    }

    if (!cloudinaryPreset) {
      console.error("Cloudinary preset is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryPreset);
    formData.append("folder", "users");
    const imageUrl = await uploadUserImage(formData);
    setImageUrl(imageUrl);
    setIsUploading(false);
  };

  const handleCancel = () => {
    setIsEditableMode(false);
    setImageUrl(user.picture || defaultProfile.src);
    setName(user.name);
    setUsername(user.username);
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
        <div
          className="w-28 h-28 rounded-full overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          {!user ? (
            <Skeleton borderRadius={100} height="100%" width="100%" />
          ) : (
            <div
              className={`relative w-full h-full ${
                isUploading && "opacity-50"
              }`}
            >
              <Image
                className="w-full h-full object-cover rounded-full hover:opacity-70 border"
                width={112}
                height={112}
                alt={`${user.name} profile picture`}
                src={imageUrl || defaultProfile}
                priority
              />
              {isUploading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <ClipLoader color="#a1a1a1" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditableMode && (
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      )}

      <div className="flex flex-col gap-5 mb-4">
        <ProfileItem
          isLoading={!user}
          item="Name"
          value={name}
          setValue={setName}
          isEditableMode={isEditableMode}
          editable
          changeEditableMode={changeEditableMode}
        />
        <ProfileItem
          isLoading={!user}
          item="Username"
          value={username}
          setValue={setUsername}
          isEditableMode={isEditableMode}
          editable
          changeEditableMode={changeEditableMode}
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
            <Button handleClick={handleCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        )}
        <LogoutButton />
      </div>
    </form>
  );
};

export default UserInfo;
