import { useAuth0 } from "@auth0/auth0-react";
import {
  addDoc,
  collection,
  doc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Atom, PaperPlaneRight, SignOut } from "phosphor-react";
import { firestore } from "../../service/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Message } from "./components/messages";
import { FormEvent, useRef, useState } from "react";

export function Chat() {
  const { logout, user } = useAuth0();
  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q);
  const dummy = useRef<any>();

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    await addDoc(messagesRef, {
      text: formValue,
      uid: user?.sub,
      image: user?.picture,
      createdAt: serverTimestamp(),
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  async function setNewUser() {
    const docRef = doc(firestore, "users", user.email);

    const data = {
      id: user?.sub,
      nome: user?.name,
      email: user?.email,
      foto: user?.picture,
      data: new Date(),
      online: false,
    };

    setDoc(docRef, data);
  }

  function handleLogout() {
    setNewUser();
    logout();
  }

  return (
    <div className="w-[70%] h-full mb-10 border rounded-md flex flex-col justify-between overflow-hidden">
      <header className="h-14 bg-blue-400 flex items-center px-4 w-full justify-between">
        <div className="flex gap-2 items-center">
          <Atom size={24} className="text-gray-200" />
          <p className="text-gray-100 font-semibold text-lg">ChatReact</p>
        </div>
        <button
          onClick={() => handleLogout()}
          className="bg-red-500 rounded-full p-2 active:opacity-90 drop-shadow-md active:drop-shadow-none"
        >
          <SignOut size={22} className="text-gray-50" />
        </button>
      </header>
      <main className="overflow-auto h-full bg-slate-300 flex flex-col p-2">
        {messages &&
          messages.map((msg, index) => <Message key={index} message={msg} />)}
        <div ref={dummy || undefined}></div>
      </main>
      <form onSubmit={sendMessage}>
        <footer className="h-14 border-t bg-slate-200 flex items-center p-2 gap-2 px-4">
          <input
            type="text"
            className="w-full border h-full rounded-md outline-none px-2 text-base text-gray-500"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button className="bg-blue-400 rounded-full p-2 active:opacity-80">
            <PaperPlaneRight className="text-gray-100" size={24} />
          </button>
        </footer>
      </form>
    </div>
  );
}
