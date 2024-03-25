import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/about" element={<About />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
