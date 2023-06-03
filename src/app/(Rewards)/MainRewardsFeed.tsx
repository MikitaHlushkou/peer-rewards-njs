"use client";

import Feed from "@/components/Feed/Feed";
import { useQuery } from "@tanstack/react-query";
import { getRewardsQuery } from "@/services/rewards";
import { IRewards } from "@/types";
import { QUERY_KEYS } from "@/enum";

const MainRewardsFeed = () => {
  const { data } = useQuery<IRewards>({
    queryKey: [QUERY_KEYS.rewards],
    queryFn: getRewardsQuery,
  });

  if (!data || data.length === 0)
    return (
      <div
        className={
          "text-center font-bold flex items-center justify-center  p-5 bg-ct-grey min-h-[400px] "
        }
      >
        No data found
      </div>
    );

  return <Feed feedList={data.reverse()} withAvatar={true} />;
};

export default MainRewardsFeed;
