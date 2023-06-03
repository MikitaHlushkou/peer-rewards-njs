import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/lib/mongo/models";
import { IUser } from "@/types";
import dbConnect from "@/lib/mongo/db";

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.nextUrl.searchParams.get("email");

    await dbConnect();
    const user: IUser | null = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "No users found",
        }),
        { status: 400 }
      );
    }
    const {
      initials,
      receivedRewardAmount,
      giftedRewardAmount,
      email,
      fullName,
    } = user;
    return NextResponse.json({
      initials,
      email,
      fullName,
      receivedRewardAmount,
      giftedRewardAmount,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
