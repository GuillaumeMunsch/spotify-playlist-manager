import { Theme } from "@radix-ui/themes";
import AppRouter from "./AppRouter";
import { SDKProvider } from "./contexts/SDKContext";
import "./App.css";
import "@radix-ui/themes/styles.css";

const App = () => (
  <Theme>
    <SDKProvider>
      <AppRouter />
    </SDKProvider>
  </Theme>
);

export default App;
