"use client";

import moment from "moment";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { IRewards } from "@/types";

interface IFeedProps {
  withAvatar?: boolean;
  feedList: IRewards;
}

const Feed = ({ feedList, withAvatar = false }: IFeedProps) => {
  return (
    <div className={"bg-ct-grey break-all"}>
      {feedList.map(
        ({
          rewardedPerson,
          senderOfTheReward,
          comment,
          initials,
          createdAt,
        }) => (
          <div
            className={"flex py-3 justify-items-stretch "}
            key={`${senderOfTheReward}-${comment}-${createdAt}`}
          >
            {withAvatar && <UserAvatar initials={initials} />}
            <div className={"px-3"}>
              <p>
                <span className={"font-bold"}> {rewardedPerson}</span> rewarded
                by <span className={"font-bold"}>{senderOfTheReward}</span>{" "}
              </p>
              <span className={"text-xs"}>
                {moment(createdAt).format("MMM Do YY, HH:mm")}
              </span>
              <p>{comment}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Feed;
