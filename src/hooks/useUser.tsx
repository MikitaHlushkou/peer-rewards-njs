"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/enum";
import { getUserProfileQuery } from "@/services/auth";
import { IUser } from "@/types";

const useUser = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const isAuthenticated = status === "authenticated";
  const { data, isSuccess, isFetching } = useQuery<IUser>(
    [QUERY_KEYS.userProfile, userEmail],
    () => getUserProfileQuery(userEmail),
    {
      enabled: isAuthenticated && !!userEmail,
    }
  );

  if (data && isSuccess) {
    return { ...data, isLoading: isFetching, isAuthenticated };
  }
  return {
    receivedRewardAmount: "",
    giftedRewardAmount: "",
    email: "",
    fullName: "",
    initials: "",
    isLoading: isFetching,
    isAuthenticated,
  };
};

export default useUser;
