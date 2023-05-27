import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class Rewards {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  senderOfTheReward: string;

  @prop()
  rewardedPerson: string;

  @prop()
  comment: string;

  @prop({ default: () => new Date() })
  rewardedAt: Date;
}
