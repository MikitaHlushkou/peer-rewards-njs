import { localService } from "@/services/utils";
import { IRewards } from "@/types";

export const getRewardsQuery = async () =>
  localService.get(`/rewards`).then((res) => res.data);

export const addRewardQuery = async (data: IRewards) =>
  localService.post("/rewards", data);
