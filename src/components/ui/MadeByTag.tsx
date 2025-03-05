"use client";

import Skeleton from "react-loading-skeleton";

const MadeByTag = ({
  name,
  color = "beige",
  isLoading,
}: {
  name: string;
  color?: string;
  isLoading?: boolean;
}) => {
  return (
    <div>
      {isLoading ? (
        <div className="w-1/2">
          <Skeleton height={20} />
        </div>
      ) : (
        <p className={`bg-${color} text-xs p-1 rounded text-neutral-700 w-fit`}>
          Made by {name}
        </p>
      )}
    </div>
  );
};

export default MadeByTag;
