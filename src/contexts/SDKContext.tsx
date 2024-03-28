import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { createContext, useState, useContext, PropsWithChildren } from "react";

// Create the context
const SDKContext = createContext<{
  sdk?: SpotifyApi;
  setSDK: (sdk: SpotifyApi) => void;
} | null>(null);

// Create a provider component
export const SDKProvider = ({ children }: PropsWithChildren) => {
  const [sdk, setSDK] = useState<SpotifyApi>();

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
  const context = useSDK();

  if (!context?.sdk) {
    return {
      sdk: null,
    };
  }

  return {
    sdk: context.sdk,
  };
};

export default SDKContext;
