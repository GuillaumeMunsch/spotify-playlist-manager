import { Outlet } from "react-router-dom";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect } from "react";
import { useSDK } from "../contexts/SDKContext";
import Loading from "../components/Loading";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-library-modify",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
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
