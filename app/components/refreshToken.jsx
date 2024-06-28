"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import setAuthorizationToken from "./setAuthorizationToken";
import axios from "axios";

const useTokenRefresh = () => {
  const { data: session } = useSession();
  let intervalId = null;
  const [newToken , setNewToken] = useState("")
  const token = session?.user?.jwtToken;
  const API = process.env.NEXT_PUBLIC_BACKEND_API ;
  const refreshToken = async() => {
    if (token) {
      try{
        const result = await axios.post(`${API}Authentication/RefreshToken` ,{ headers:
          {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session?.user?.refreshToken, 
      }})

      setNewToken(result?.data?.jwtToken)

      setAuthorizationToken(newToken);

      }catch(err){
        console.log(err)
      }
      

    
    }
  };

  const startTokenRefresh = () => {
    refreshToken(); // Initial token refresh

    // Set interval to refresh token every 2 minutes (120,000 milliseconds)
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
