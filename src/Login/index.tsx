import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Security from "./../assets/security.png";

export function Login() {
  const { loginWithPopup, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? (
    <div className="w-screen h-screen items-center justify-center flex">
      <div className="w-[450px] h-auto bg-white rounded-md flex flex-col items-center pt-4 pb-8 px-10 gap-4 drop-shadow-2xl border border-gray-100">
        <img src={Security} alt="" className="w-32" />
        <button
          onClick={() => loginWithPopup()}
          className="bg-yellow-400 w-full h-10 text-gray-50 font-semibold text-base rounded-md active:brightness-95 drop-shadow-md"
        >
          Auth0
        </button>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
