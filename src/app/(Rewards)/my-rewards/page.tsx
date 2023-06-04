import MyRewardsFeed from "@/app/(Rewards)/my-rewards/MyRewardsFeed";

export const metadata = {
  alternates: {
    canonical: "/my-rewards",
  },
  title: "My received Rewards",
  description:
    "See how valuable your work is and which employees value you the most",
};

const MyRewardsPage = () => {
  return <MyRewardsFeed />;
};

export default MyRewardsPage;
