import { Route, Routes } from "react-router-dom";
import App from "./App";
import { Login } from "./Login";
import { PrivateRouter } from "./PrivateRouter";

export function Router() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRouter />}>
        <Route path="/" element={<App />} />
      </Route>
    </Routes>
  );
}
