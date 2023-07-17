import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import Sidebar from '../components/Sidebar';
import {
  getDocs,
  collection,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
export default function Profile() {
  const [inventoryData, setInventoryData] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchInventoryData = async () => {
      const ref = collection(db, `tbd-database/${user.uid}/companyDetails`);
      const snapshot = await getDocs(ref);
      const inventoryData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventoryData(inventoryData);
    };

    fetchInventoryData();
  }, [user.uid]);
  return (
    <div className="flex flex-row gap-6">
      <Sidebar />
      {inventoryData.map((item) => (
        <h1 key={item.id}>
          <h3>{item.address}</h3>
          <h3>{item.companyName}</h3>
          <h3>{item.companyOwner}</h3>
          <h3>{item.contactNo}</h3>
        </h1>
      ))}
    </div>
  );
}
