import { create } from "zustand";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
export interface IRigidFrame {
  pos: [number, number, number];
}
interface AuthDataType {
  isAuthenticated: boolean;
  authenticatedUser: () => void;
}
export const useAuthStore = create<AuthDataType>((set) => ({
  isAuthenticated: false,
  authenticatedUser: async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const collectionData = [] as any;

    querySnapshot.forEach((doc) => {
      collectionData.push({ ...doc.data(), id: doc.id });
    });
    let isAnyLoggedIn = false;
    collectionData.forEach((itm: { [key: string]: string }) => {
      if (itm.isLoggedIn) {
        isAnyLoggedIn = true;
      }
    });
    if (isAnyLoggedIn) {
      set((state) => ({
        ...state,
        isAuthenticated: true,
      }));
    } else {
      window.location.href = "https://sharetribe-mbsn.onrender.com/login";
    }
  },
}));
