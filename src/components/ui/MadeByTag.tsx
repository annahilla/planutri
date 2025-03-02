"use client";

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const MadeByTag = ({
  name,
  color = "beige",
  isLoading,
}: {
  name: string | undefined;
  color?: string;
  isLoading?: boolean;
}) => {
  const [randomName, setRandomName] = useState<string | null>(null);

  useEffect(() => {
    setRandomName("user" + Math.floor(Math.random() * 9000 + 1000));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-1/2">
          <Skeleton height={20} />
        </div>
      ) : (
        <p className={`bg-${color} text-xs p-1 rounded text-neutral-700 w-fit`}>
          Made by {name || randomName}
        </p>
      )}
    </div>
  );
};

export default MadeByTag;
