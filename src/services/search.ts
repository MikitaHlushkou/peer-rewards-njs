import { localService } from "@/services/api";

export const usernameSearchQuery = async (searchedValue: string) =>
  localService
    .get(`/search?searchedValue=${searchedValue}`)
    .then((response) => response.data);
