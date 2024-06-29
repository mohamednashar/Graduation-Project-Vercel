"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

const useTokenRefresh = () => {
  const { data: session } = useSession();
  let intervalId = null;
  const token = session?.user?.jwtToken;
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  const refreshToken = async () => {
  
      try {
        const response = await axios.post(`${API}Authentication/RefreshToken`, {}, {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        const result = response.data;
        console.log(result)
        console.log("Token refreshed successfully");
        return result;
      } catch (error) {
        console.error('There was a problem with the refresh operation:', error.response ? error.response.data : error.message);
      }
  
  };

  const startTokenRefresh = () => {
    refreshToken(); // Initial token refresh

    // Set interval to refresh token every 1.5 minutes (90,000 milliseconds)
    intervalId = setInterval(refreshToken, 90000);
  };

  const stopTokenRefresh = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    startTokenRefresh(); // Start token refresh on component mount

    return () => {
      stopTokenRefresh(); // Clean up interval on component unmount
    };
  }, [token]); // Restart interval when token changes

  return {
    startTokenRefresh,
    stopTokenRefresh,
  };
};

export default useTokenRefresh;
