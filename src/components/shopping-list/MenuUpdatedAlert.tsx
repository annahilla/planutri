"use client";

import AlertMessage from "../ui/AlertMessage";

const MenuUpdatedAlert = ({ dismissAlert }: { dismissAlert: () => void }) => {
  return (
    <AlertMessage
      text="You have made changes to the meal planner, please update the shopping list."
      handleClick={dismissAlert}
    />
  );
};

export default MenuUpdatedAlert;
