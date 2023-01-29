import { useAuth0 } from "@auth0/auth0-react";

export function Header() {
  const { user } = useAuth0();
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full h-60 rounded-sm bg-headerImg bg-cover"></div>
      <div className="w-28 h-28 flex items-center justify-center flex-col p-2 relative ml-4 -mt-14">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 overflow-hidden drop-shadow-md bg-cover p-1 relative animate-spin" />
        <img
          src={user?.picture}
          alt=""
          className="w-[78%] h-[78%] rounded-full -mt-10 absolute top-[52px]"
        />
      </div>
    </div>
  );
}
