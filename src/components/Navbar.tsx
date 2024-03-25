import { Avatar, Flex, Link } from "@radix-ui/themes";
import theme from "../theme";
import { useUserProfile } from "../contexts/UserProfileContext";

const navbarStyle: React.CSSProperties = {
  backgroundColor: theme.colors.accent[500],
  minHeight: "70px",
  padding: "8px",
  borderRadius: "4px",
};

const Navbar = () => {
  const { userProfile } = useUserProfile();

  if (!userProfile) return null;
  return (
    <Flex style={navbarStyle} justify="between" align="center" direction="row">
      <Flex direction="row" gap="4">
        <Link href="/app/dashboard">Dashboard</Link>
        <Link href="/app/about">About</Link>
      </Flex>
      <Avatar src={userProfile.images[0].url} fallback="A" />
    </Flex>
  );
};

export default Navbar;
