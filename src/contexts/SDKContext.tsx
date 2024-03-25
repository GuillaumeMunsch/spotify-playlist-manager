import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { createContext, useState, useContext, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const SDKContext = createContext<{
  sdk: SpotifyApi | null;
  setSDK: (sdk: SpotifyApi) => void;
} | null>(null);

// Create a provider component
export const SDKProvider = ({ children }: PropsWithChildren) => {
  const [sdk, setSDK] = useState<SpotifyApi | null>(null);

  return (
    <SDKContext.Provider value={{ sdk, setSDK }}>
      {children}
    </SDKContext.Provider>
  );
};

// Custom hook to use the context
export const useSDK = () => {
  return useContext(SDKContext);
};

export const useSpotifySDK = () => {
  const navigate = useNavigate();

  const context = useSDK();
  if (!context?.sdk) {
    navigate("/");
    return { sdk: {} as SpotifyApi }; // 👀
  }

  return {
    sdk: context.sdk,
  };
};

export default SDKContext;
