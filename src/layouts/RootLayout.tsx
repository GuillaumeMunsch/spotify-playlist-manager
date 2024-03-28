import { Outlet, useNavigate } from "react-router-dom";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import { useSDK } from "../contexts/SDKContext";
import { useUserProfile } from "../contexts/UserProfileContext";
import Loading from "../components/Loading";
import { sliderPropDefs } from "@radix-ui/themes/props";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-library-modify",
  "user-library-read",
];

const useAuthenticate = () => {
  const sdkContext = useSDK();

  useEffect(() => {
    if (!sdkContext || sdkContext.sdk) return;

    SpotifyApi.performUserAuthorization(
      import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      "http://localhost:5173/",
      scopes,
      async (accessToken) => {
        const sdk = SpotifyApi.withAccessToken(
          import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          accessToken
        );
        await sdk.authenticate();
        sdkContext.setSDK(sdk);
      }
    );
  }, [sdkContext, sdkContext?.sdk]);

  return;
};

const RootLayout = () => {
  const sdkContext = useSDK();

  useAuthenticate();

  if (!sdkContext || !sdkContext?.sdk) return <Loading />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
