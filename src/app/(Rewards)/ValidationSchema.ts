import { number, object, string } from "yup";

export const addRewardSchema = (availableFunds) =>
  object({
    rewardedPerson: object({ id: string(), fullName: string() })
      .nullable()
      .required("To is a required field"),
    reward: number()
      .max(availableFunds, "You are entering more than you have!")
      .required("Reward is a required field"),
    comment: "",
  });
