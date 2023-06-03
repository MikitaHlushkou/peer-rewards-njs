import mongoose from "mongoose";
import { getModelForClass } from "@typegoose/typegoose";
import { Rewards } from "@/lib/mongo/models/Rewards";
import { User } from "@/lib/mongo/models/User";

export const RewardsModel =
  mongoose.models.Rewards || getModelForClass(Rewards);

export const UserModel = mongoose.models.User || getModelForClass(User);
