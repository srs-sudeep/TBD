import { createContext, useContext } from 'react';
import { UserAuth } from './AuthContext';
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
    const company = collection(db, "tbd-database"); 

    const { user } = UserAuth();

    const createCompany = async (user) => {
      await addDoc(collection(db, `tbd-database/${user.uid}/companyDetails`), 
      {
        companyName: "My Company",
        companyAddress: "123 Main St",
        companyCity: "Anytown",
        companyState: "CA",
        companyZip: "12345",
      });
      return;
    }

  return (
    <FirestoreContext.Provider value={{createCompany}}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
