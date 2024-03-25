import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import HomeView from "./HomeView";
import { useEffect, useState } from "react";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useNavigate } from "react-router-dom";
import { useSDK } from "../../contexts/SDKContext";
import Loading from "../../components/Loading";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-library-modify",
  "user-library-read",
];

const useAuthenticate = (sdk: SpotifyApi) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    sdk.authenticate().then(() => setIsAuthenticated(true));
  }, [sdk]);

  return { isAuthenticated };
};

const useFetchProfile = ({
  isAuthenticated,
  sdk,
  setUserProfile,
}: {
  sdk: SpotifyApi;
  isAuthenticated: boolean;
  setUserProfile: (profile: UserProfile) => void;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated)
      sdk.currentUser.profile().then((userProfile) => {
        setUserProfile(userProfile);
        navigate("/app/dashboard");
      });
  }, [isAuthenticated]);
};

const HomeContainer = () => {
  const sdkContext = useSDK();

  const sdk = SpotifyApi.withUserAuthorization(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    "http://localhost:5173/",
    scopes
  );
  if (sdkContext?.setSDK) {
    sdkContext.setSDK(sdk);
  }

  const { isAuthenticated } = useAuthenticate(sdk);
  const { setUserProfile } = useUserProfile();
  useFetchProfile({ setUserProfile, sdk, isAuthenticated });

  if (!isAuthenticated || !sdkContext?.sdk) return <Loading />;

  return <HomeView sdk={sdk} />;
};

export default HomeContainer;
