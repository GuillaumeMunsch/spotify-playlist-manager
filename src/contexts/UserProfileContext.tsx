import { UserProfile } from "@spotify/web-api-ts-sdk";
import { createContext, useState, useContext, PropsWithChildren } from "react";

// Create the context
const UserProfileContext = createContext<{
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile) => void;
}>({ userProfile: null, setUserProfile: () => {} });

// Create a provider component
export const UserProfileProvider = ({ children }: PropsWithChildren) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook to use the context
export const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export default UserProfileContext;
