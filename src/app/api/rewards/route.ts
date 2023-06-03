import { NextRequest, NextResponse } from "next/server";

import { RewardsModel, UserModel } from "@/lib/mongo/models";
import dbConnect from "@/lib/mongo/db";
import { IAddNewReward } from "@/types";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("email");
  await dbConnect();

  if (userEmail) {
    const userRewards = await RewardsModel.find(
      { rewardedPersonEmail: userEmail },
      { rewardedPersonEmail: 0 }
    ).lean();
    return NextResponse.json(userRewards);
  }

  const rewards = await RewardsModel.find({}).lean();

  return NextResponse.json(rewards);
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch((e) => console.error("Error", e));
  const {
    comment,
    rewardedPerson,
    senderOfTheReward,
    reward,
  } = data as IAddNewReward;

  await dbConnect();
  console.log("SENDER", senderOfTheReward);
  // update rewards for users
  await UserModel.updateOne(
    {
      email: senderOfTheReward,
    },
    { $inc: { giftedRewardAmount: reward, receivedRewardAmount: -reward } }
  );

  await UserModel.updateOne(
    { _id: rewardedPerson.id },
    { $inc: { receivedRewardAmount: reward } }
  );
  const rewardedUserModel = await UserModel.findById(rewardedPerson.id);

  const newReward = new RewardsModel({
    senderOfTheReward,
    rewardedPerson: rewardedUserModel.fullName,
    reward,
    comment,
    rewardedPersonEmail: rewardedUserModel.email,
  });
  await newReward.save();

  return NextResponse.json({ data: newReward.toJSON() });
}
