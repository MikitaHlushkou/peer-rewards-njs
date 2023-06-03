export interface IReward {
  senderOfTheReward: string;
  rewardedPerson: string;
  reward: string;
  comment: string;
  initials: string;
  createdAt: string;
}

export type IRewards = IReward[];

export interface IUser {
  email: string;
  fullName: string;
  giftedRewardAmount: number;
  receivedRewardAmount: number;
  initials: string;
}

export interface IUserRegister {
  email: string;
  fullName: string;
  password: string;
}

export interface IUsersList {
  id: string;
  fullName: string;
}

export interface IAddNewReward {
  senderOfTheReward: string;
  rewardedPerson: { id: string; fullName: string };
  reward: string;
  comment: string;
}
