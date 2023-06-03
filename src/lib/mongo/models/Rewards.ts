import { modelOptions, pre, prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { generateInitials } from "@/utils/userUtils";

@pre<Rewards>("save", async function () {
  this.initials = generateInitials(this.rewardedPerson);
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})
export class Rewards {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  senderOfTheReward: string;

  @prop()
  rewardedPerson: string;

  @prop()
  comment: string;

  @prop()
  reward: string;

  @prop()
  rewardedPersonEmail: string;

  @prop()
  initials: string;
}
