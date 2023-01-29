import { useAuth0 } from "@auth0/auth0-react";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../service/firebase/firebase";

export function Logged() {
  const { user } = useAuth0();
  const [listUser, setUser] = useState([]);
  // const messagesRef = collection(firestore, "users");
  // const q = query(messagesRef, limit(5));
  // const [users] = useCollectionData(q);

  async function getUserExist() {
    const docRef = query(
      collection(firestore, "users"),
      where("online", "==", true)
    );
    const docsConverted = await getDocs(docRef);
    docsConverted.forEach((doc) => {
      setUser([doc.data().nome, doc.data().online]);
    });
  }

  async function setNewUser() {
    const docRef = doc(firestore, "users", user.email);

    const data = {
      id: user?.sub,
      nome: user?.name,
      email: user?.email,
      foto: user?.picture,
      data: new Date(),
      online: true,
    };

    setDoc(docRef, data);
  }

  // setNewUser();
  // getUserExist();

  return (
    <>
      {/* {users.map((userFire, index) => (
        <div
          key={index}
          className="w-[180px] h-[50px] absolute md:flex items-center px-2 gap-2 bottom-0 hidden"
        >
          <div className="relative">
            <div className="absolute right-3">
              <div className="w-3 h-3 bg-green-400 rounded-full absolute"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full absolute animate-ping"></div>
            </div>
            <img
              src={userFire.image}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>
          <span className="capitalize text-gray-600 text-lg font-normal">
            {userFire.nome}
          </span>
        </div>
      ))} */}
    </>
  );
}
