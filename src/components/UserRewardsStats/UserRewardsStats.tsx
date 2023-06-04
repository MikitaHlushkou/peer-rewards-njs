"use client";
import useUser from "@/hooks/useUser";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { Skeleton } from "@mui/material";

const UserRewardsStats = () => {
  const {
    receivedRewardAmount,
    giftedRewardAmount,
    initials,
    fullName,
    isLoading,
  } = useUser();

  const profileFields = [
    {
      title: "My rewards",
      amount: receivedRewardAmount,
    },
    {
      title: "Give",
      amount: giftedRewardAmount,
    },
  ];
  return (
    <>
      <div className={"ml-4 hidden md:block"}>
        <UserAvatar initials={initials} size={"big"} fullName={fullName} />
      </div>
      <div className={"flex md:gap-x-40 items-center"}>
        {profileFields.map(({ title, amount }) => (
          <div
            key={title}
            className={"flex  md:flex-col whitespace-nowrap md:gap-y-2"}
          >
            <span className={"px-1"}>{title}</span>
            {isLoading ? (
              <Skeleton />
            ) : (
              <span className={"font-bold px-1"}>${amount}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserRewardsStats;
