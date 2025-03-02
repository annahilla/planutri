"use client";

const MadeByTag = ({
  name,
  color = "beige",
}: {
  name: string | undefined;
  color?: string;
}) => {
  return (
    <p className={`bg-${color} text-xs p-1 rounded text-neutral-700 w-fit`}>
      Made by {name}
    </p>
  );
};

export default MadeByTag;
