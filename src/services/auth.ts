import { localService } from "@/services/utils";
import { IUserRegister } from "@/types";

export const registerUserQuery = async (data: IUserRegister) =>
  localService.post("/register", data).then((res) => res.data);

export const getUserProfileQuery = async (email: string) =>
  localService.get(`/userInfo?email=${email}`).then((res) => res.data);
