import { localService } from "@/services/api";
import { IAddNewReward, IReward } from "@/types";

export const getRewardsQuery = async () =>
  localService.get(`/rewards`).then((res) => res.data);

export const getUserRewardsQuery = async (email: string) =>
  localService.get(`/rewards?email=${email}`).then((res) => res.data);

export const addRewardQuery = async (data: IAddNewReward) =>
  localService.post("/rewards", data);
