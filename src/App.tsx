import { useAuth0 } from "@auth0/auth0-react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { Chat } from "./components/chat";
import { Header } from "./components/header";
import { firestore } from "./service/firebase/firebase";

function App() {
  const { user } = useAuth0();

  const createUser = async () => {
    const ref = collection(firestore, "users");
    const docRef = doc(firestore, "users");
    const q = query(
      collection(firestore, "users"),
      where("id", "==", user?.sub)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty === true) {
      await addDoc(ref, {
        id: user?.sub,
        nome: user?.name,
        email: user?.email,
        foto: user?.picture,
        data: new Date(),
      });
    }
    querySnapshot.forEach(async (doc) => {
      if (doc.data().id !== user?.sub) {
        await addDoc(ref, {
          id: user?.sub,
          nome: user?.name,
          email: user?.email,
          foto: user?.picture,
          data: new Date(),
        });
      }
    });
  };

  useEffect(() => {
    createUser();
  }, []);

  return (
    <div className="max-w-7xl flex items-center m-auto flex-col border-r border-l border-gray-100 h-screen bg-white">
      <Header />
      <Chat />
    </div>
  );
}

export default App;
