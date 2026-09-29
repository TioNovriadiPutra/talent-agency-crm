import useAuthController from "@/controllers/useAuthController";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AuthInitializer() {
  const { pathname } = useRouter();

  const { meService } = useAuthController();

  useEffect(() => {
    if (pathname !== "/login") {
      meService();
    }
  }, []);

  return null;
}

export default AuthInitializer;
