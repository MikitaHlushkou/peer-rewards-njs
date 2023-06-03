import { NextResponse } from "next/server";
import { UserModel } from "@/lib/mongo/models";
import { IUserRegister } from "@/types";
import dbConnect from "@/lib/mongo/db";

export async function POST(req: Request) {
  try {
    const { fullName, password, email } = (await req.json()) as IUserRegister;
    await dbConnect();

    const isUserExists = await UserModel.exists({ email });
    if (isUserExists) {
      return NextResponse.json(
        { message: "User with this email is already registered" },
        { status: 400 }
      );
    }

    const user = await UserModel.create({
      fullName,
      email: email.toLowerCase(),
      password,
    });

    return NextResponse.json({
      user: {
        fullName: user.fullName,
        email: user.email,
      },
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
