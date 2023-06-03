import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/lib/mongo/models";
import dbConnect from "@/lib/mongo/db";

export async function GET(req: NextRequest) {
  try {
    const searchedName = req.nextUrl.searchParams.get("searchedValue");

    await dbConnect();
    const users = await UserModel.find({
      fullName: { $regex: searchedName, $options: "i" },
    });

    return NextResponse.json(
      users.map(({ _id: id, fullName }) => ({
        id,
        fullName,
      }))
    );
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
