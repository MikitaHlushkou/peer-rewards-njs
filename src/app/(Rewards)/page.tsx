import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { ReactQueryHydrate } from "@/components/ReactQueryHydrate/ReactQueryHydrate";
import MainRewardsFeed from "@/app/(Rewards)/MainRewardsFeed";
import { getRewardsQuery } from "@/services/rewards";
import { QUERY_KEYS } from "@/enum";

const HomePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([QUERY_KEYS.rewards], getRewardsQuery);
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <MainRewardsFeed />
    </ReactQueryHydrate>
  );
};

export default HomePage;
