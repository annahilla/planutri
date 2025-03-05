"use client";

import { AuthUser } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextInterface {
  user: AuthUser;
  updateUserInfo: (updatedUser: AuthUser) => void;
}

interface UserProviderInterface {
  children: ReactNode;
  fetchedUser: AuthUser;
}

const UsersContext = createContext<UserContextInterface>({
  user: { email: "" },
  updateUserInfo: () => {},
});

export const useUser = () => {
  return useContext(UsersContext);
};

export const UserProvider = ({
  children,
  fetchedUser,
}: UserProviderInterface) => {
  const [user, setUser] = useState(fetchedUser);

  const updateUserInfo = (updatedUser: AuthUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  return (
    <UsersContext.Provider
      value={{
        user,
        updateUserInfo,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
