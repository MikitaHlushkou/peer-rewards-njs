"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Skeleton } from "@mui/material";
import useUser from "@/hooks/useUser";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUser();
  const logoutStyles = "bg-red-500 hover:bg-red-700 mr-4";
  const loginStyles = "bg-blue-600 hover:bg-blue-700 mr-4";

  const handleLogoutClick = () => (isAuthenticated ? signOut() : null);
  const handleLoginClick = () => router.push("/login");
  const handleRegisterClick = () => router.push("/register");

  return (
    <header className={"flex justify-end container p-3"}>
      {isLoading ? (
        <Skeleton className={"w-16"} />
      ) : (
        <>
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
        </>
      )}
    </header>
  );
};

export default Header;
