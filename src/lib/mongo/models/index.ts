import mongoose from "mongoose";
import { getModelForClass } from "@typegoose/typegoose";
import { Rewards } from "@/lib/mongo/models/Rewards";

export const RewardsModel =
  mongoose.models.Rewards || getModelForClass(Rewards);
