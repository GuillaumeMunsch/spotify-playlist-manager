import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import HomeView from "./HomeView";
import { useEffect, useState } from "react";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-library-modify",
  "user-library-read",
];

const useAuthenticate = (sdk: SpotifyApi) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    sdk.authenticate().then((authenticated) => {
      console.log("Authenticated", authenticated);
      setIsAuthenticated(true);
    });
  }, [sdk]);

  return { isAuthenticated };
};

const HomeContainer = () => {
  const sdk = SpotifyApi.withUserAuthorization(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    "http://localhost:5173/",
    scopes
  );

  const { isAuthenticated } = useAuthenticate(sdk);

  if (!isAuthenticated) return <div>Loading</div>;
  return <HomeView sdk={sdk} />;
};

export default HomeContainer;
