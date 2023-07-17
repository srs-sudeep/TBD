import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import Sidebar from '../components/Sidebar';
import * as assets from "../assets";
import "./css/Profile.css";
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
    <div className="flex flex-row ">
      <Sidebar />
      <div className="card p-16 m-0" >
      <img className="image h-32 justify-center mb-5" src={assets.avatar} alt="userimg" />
      {inventoryData.map((item) => (
        <ul key={item.id}>
          <li className="font-bold text-4xl">{item.companyOwner}</li>
          <li>Company Name: {item.companyName}</li>
          <li>Address: {item.address}</li>
          <li>Contact: {item.contactNo}</li>
        </ul>
      ))}
      </div>
    </div>

  );
}
