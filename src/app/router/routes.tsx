import { AuthPage } from "@pages/AuthPage";
import { GoodsPage } from "@pages/GoodsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const RoutePath = {
  auth: "/auth",
  goods: "/",
};

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

export const routeConfig: RouteConfig[] = [
  {
    path: RoutePath.auth,
    element: (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    ),
  },
  {
    path: RoutePath.goods,
    element: (
      <ProtectedRoute>
        <GoodsPage />
      </ProtectedRoute>
    ),
  },
];
