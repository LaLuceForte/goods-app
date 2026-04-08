import { Routes, Route, BrowserRouter } from "react-router-dom";
import { routeConfig } from "./routes";

export const AppRouter = (): React.ReactNode => (
  <BrowserRouter>
    <Routes>
      {routeConfig.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
    </Routes>
  </BrowserRouter>
);
