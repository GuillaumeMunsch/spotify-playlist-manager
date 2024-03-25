import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

type Props = {
  sdk: SpotifyApi;
};

const useProfile = (sdk: SpotifyApi) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    sdk.currentUser.profile().then((userProfile) => setProfile(userProfile));
  }, [sdk]);

  return { profile };
};

const HomeView = ({ sdk }: Props) => {
  const { profile } = useProfile(sdk);

  console.log("Profile", profile);

  return <div>HomeView</div>;
};

export default HomeView;
