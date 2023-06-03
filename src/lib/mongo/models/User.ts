import { index, modelOptions, pre, prop } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import { generateInitials } from "@/utils/userUtils";

@index({ email: 1 })
@pre<User>("save", async function () {
  this.initials = generateInitials(this.fullName);
  // Hash password if the password is new or was updated
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the User class to be used as TypeScript type
export class User {
  @prop()
  fullName: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 8 })
  password: string;

  @prop({ default: () => 0 })
  giftedRewardAmount: number;

  @prop({ default: () => 100 })
  receivedRewardAmount: number;

  @prop({ default: "user" })
  role: string;

  @prop()
  initials: string;

  // Instance method to check if passwords match
  async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
