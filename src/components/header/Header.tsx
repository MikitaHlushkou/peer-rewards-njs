"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Skeleton } from "@mui/material";
import useUser from "@/hooks/useUser";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUser();
  const logoutStyles = "bg-red-500 hover:bg-red-700";
  const loginStyles = "bg-blue-600 hover:bg-blue-700";

  const handleLogoutClick = () => (isAuthenticated ? signOut() : null);
  const handleLoginClick = () => router.push("/login");
  const handleRegisterClick = () => router.push("/register");

  return (
    <header className={"flex justify-between container p-3  "}>
      <h1 className={"place-self-center"}>
        {" "}
        <span className={"text-blue-600 font-bold"}>Peer Rewards</span> — to
        make your work <span className={"font-bold text-green-700"}>count</span>
      </h1>
      {isLoading ? (
        <Skeleton className={"w-16"} />
      ) : (
        <div className={"flex gap-x-4"}>
          <Button
            variant={"contained"}
            onClick={isAuthenticated ? handleLogoutClick : handleLoginClick}
            className={isAuthenticated ? logoutStyles : loginStyles}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
          {!isAuthenticated && (
            <Button
              variant={"contained"}
              onClick={handleRegisterClick}
              className={loginStyles}
            >
              Register
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
