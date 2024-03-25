import { Avatar, Flex, Link } from "@radix-ui/themes";
import theme from "../theme";
import { useUserProfile } from "../contexts/UserProfileContext";

const navbarStyle: React.CSSProperties = {
  backgroundColor: theme.colors.accent[500],
  minHeight: "70px",
};

const Navbar = () => {
  // const {sdk} = useSpotifySDK();
  const { userProfile } = useUserProfile();
  if (!userProfile) return null;
  return (
    <Flex style={navbarStyle} direction="column">
      <Flex direction="column">
        <Link href="#">Dashboard</Link>
        <Link href="#">About</Link>
      </Flex>
      <Avatar src={userProfile.images[0].url} fallback="A" />
    </Flex>
  );
};

export default Navbar;
