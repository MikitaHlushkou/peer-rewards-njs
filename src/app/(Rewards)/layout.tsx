import Link from "next/link";
import { ReactNode } from "react";
import AddRewardModal from "@/app/(Rewards)/AddRewardModal";
import UserRewardsStats from "@/components/UserRewardsStats/UserRewardsStats";

const RewardsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"container relative "}>
      <div
        className={
          "p-3  flex flex-col md:min-h-[150px]  md:items-center   md:flex-row md:p-0 gap-x-60 "
        }
      >
        <UserRewardsStats />
      </div>

      <nav className={"p-2"}>
        <Link className="text-sm hover:text-gray-600" href={"/"} legacyBehavior>
          <a className="hover:text-blue-700 p-3">Feed</a>
        </Link>
        <Link
          href={"/my-rewards"}
          className="text-sm hover:text-gray-600"
          legacyBehavior
        >
          <a className="hover:text-blue-700 p-3 ">My Rewards</a>
        </Link>
      </nav>
      <div className={"relative"}>
        <div className={"border-b-2 border-ct-dark-600  "} />
        <AddRewardModal />
      </div>
      <div className={"p-5 bg-ct-grey"}>{children}</div>
    </div>
  );
};

export default RewardsLayout;
