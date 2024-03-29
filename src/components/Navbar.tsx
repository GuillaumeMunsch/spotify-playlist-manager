import { Avatar, Button, Flex, Link } from "@radix-ui/themes";
import theme from "../theme";
import { useEffect, useState } from "react";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { useSDK, useSpotifySDK } from "../contexts/SDKContext";

const navbarStyle: React.CSSProperties = {
  backgroundColor: theme.colors.accent[500],
  minHeight: "70px",
  padding: "8px",
};

const useFetchProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const sdkContext = useSDK();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!sdkContext?.sdk || Boolean(userProfile)) return;

      const profile = await sdkContext.sdk.currentUser.profile();

      setUserProfile(profile);
    };

    fetchProfile();
  }, [sdkContext, userProfile]);

  return { userProfile, setUserProfile };
};

const Navbar = () => {
  const { userProfile } = useFetchProfile();
  const { sdk } = useSpotifySDK();

  if (!userProfile) return null;
  return (
    <Flex style={navbarStyle} justify="between" align="center" direction="row">
      <Flex direction="row" gap="4">
        <Link size="4" weight="medium" href="/app/dashboard">
          Dashboard
        </Link>
        <Link size="4" weight="medium" href="/app/about">
          About
        </Link>
      </Flex>
      <Flex align="center" gapX="2">
        <Button
          onClick={async () => {
            const logoutRes = await sdk?.logOut();
            console.log("logoutRes", logoutRes);
          }}
        >
          Logout
        </Button>
        <Avatar src={userProfile.images[0].url} fallback="A" />
      </Flex>
    </Flex>
  );
};

export default Navbar;
