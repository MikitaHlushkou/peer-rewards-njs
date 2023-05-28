export interface IReward {
  senderOfTheReward: string;
  rewardedPerson: string;
  reward: string;
  comment: string;
  rewardedAt?: string;
}

export type IRewards = IReward[];
