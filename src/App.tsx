import { Theme } from "@radix-ui/themes";
import AppRouter from "./AppRouter";
import { SDKProvider } from "./contexts/SDKContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import "./App.css";
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <Theme>
      <SDKProvider>
        <UserProfileProvider>
          <AppRouter />
        </UserProfileProvider>
      </SDKProvider>
    </Theme>
  );
}

export default App;
