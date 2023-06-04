"use client";

import { useQuery } from "@tanstack/react-query";
import Feed from "@/components/Feed/Feed";
import { Skeleton } from "@mui/material";
import useUser from "@/hooks/useUser";
import { getUserRewardsQuery } from "@/services/rewards";
import { IRewards } from "@/types";
import { QUERY_KEYS } from "@/enum";

const MyRewardsFeed = () => {
  const { email } = useUser();

  const { data, isFetching, isFetched } = useQuery<IRewards>(
    [QUERY_KEYS.userRewards, email],
    () => getUserRewardsQuery(email),
    { enabled: !!email }
  );

  if (isFetching || !isFetched) {
    return <Skeleton className={" p-5 min-h-[400px]"} />;
  }

  if (!data || data.length === 0)
    return (
      <div
        className={
          "text-center font-bold flex items-center justify-center  p-5  min-h-[400px] "
        }
      >
        No data found
      </div>
    );

  return <Feed feedList={data.reverse()} withAvatar={true} />;
};

export default MyRewardsFeed;
