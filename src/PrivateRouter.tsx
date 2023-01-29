import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { Logged } from "./components/logged";

export function PrivateRouter() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <span className="text-xl text-blue-500">Carregando Permissões</span>
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      <Logged />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
