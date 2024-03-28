import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Flex } from "@radix-ui/themes";

const appLayoutStyle: React.CSSProperties = {
  maxWidth: "800px",
  border: "1px solid #000",
  borderRadius: "8px",
  overflow: "clip",
};

const AppLayout = () => {
  return (
    <Flex justify="center">
      <Flex direction="column" style={appLayoutStyle}>
        <Navbar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AppLayout;
