import Skeleton from "react-loading-skeleton";

const ProfileItem = ({
  isLoading,
  item,
  value,
}: {
  isLoading: boolean;
  item: string;
  value: string | undefined | null;
}) => {
  return (
    <div className="w-full h-5">
      <div className="w-full h-full">
        {isLoading ? (
          <Skeleton height="100%" width="100%" />
        ) : (
          <div className="flex gap-2 items-center w-full">
            <p className="font-bold">{item}:</p>
            <p>{value}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileItem;
