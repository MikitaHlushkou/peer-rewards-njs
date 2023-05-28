import { NextRequest, NextResponse } from "next/server";

import { RewardsModel } from "@/lib/mongo/models";
import dbConnect from "@/lib/mongo/db";
interface CreateRewardBody {
  senderOfTheReward: string;
  rewardedPerson: string;
  reward: string;
  comment: string;
  rewardedAt: Date;
}
export async function GET() {
  await dbConnect();
  const todos = await RewardsModel.find({}).limit(10).lean();

  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch((e) => console.error("Error", e));
  const {
    comment,
    rewardedPerson,
    senderOfTheReward,
    reward,
  } = data as CreateRewardBody;

  await dbConnect();

  const newReward = new RewardsModel({
    senderOfTheReward,
    rewardedPerson,
    reward,
    comment,
  });
  await newReward.save();

  return NextResponse.json({ data: newReward.toJSON() });
}
