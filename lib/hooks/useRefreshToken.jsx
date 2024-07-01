"use client";
import axios from "lib/axios";
import { useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session,update } = useSession();
  console.log(session?.user?.jwtToken)

  const refreshToken = async () => {
    const res = await axios.post("Authentication/RefreshToken", null, {
      headers: {
        refreshToken: session?.user.refreshToken,
      },
    });

    console.log("New "+session?.user?.jwtToken)
    await update({
      ...session,
      user:{
        ...session?.user,
        jwtToken: res.data.jwtToken,
      }
    })

  };

  return refreshToken;
};
