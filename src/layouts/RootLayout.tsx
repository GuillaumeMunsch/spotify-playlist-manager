import { Outlet, useNavigate } from "react-router-dom";
import { useSDK } from "../contexts/SDKContext";

const RootLayout = () => {
  const sdkContext = useSDK();
  const navigate = useNavigate();

  if (sdkContext?.sdk) {
    navigate("/app/dashboard");
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
