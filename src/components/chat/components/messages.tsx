import { useAuth0 } from "@auth0/auth0-react";

export function Message(props: any) {
  const { user } = useAuth0();
  const { text, image, uid } = props.message;

  const messageUid = uid === user?.sub ? "send" : "received";

  return messageUid === "send" ? (
    <div className="message flex items-center gap-2 self-end mt-2">
      <div className="bg-white p-2 rounded-md text-sm text-gray-500 max-w-[350px] break-all">
        <p>{text}</p>
      </div>
      <img src={user?.picture} alt="" className="w-10 rounded-full" />
    </div>
  ) : (
    <div className="message flex items-center gap-2 self-start mt-2">
      <img src={image || ""} alt="" className="w-10 rounded-full" />
      <div className="bg-white p-2 rounded-md text-sm text-gray-500 max-w-[350px] break-all">
        <p>{text}</p>
      </div>
    </div>
  );
}
