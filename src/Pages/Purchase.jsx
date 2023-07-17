import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import Sidebar from '../components/Sidebar';
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

export default function Sale() {
  const [inventoryData, setInventoryData] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchInventoryData = async () => {
      const ref = collection(db, `tbd-database/${user.uid}/purchase`);
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
    <div className="flex">
      <Sidebar />
    <div>
      <div className="mx-10 mt-5 mb-8 text-4xl font-bold">Purchase!</div>
      <Link to="/purchaseform">
        <button className="px-10 py-4 rounded-full text-gray-100 bg-gray-950 mx-10 mt-0">Add Purchase!</button>
      </Link>
      <div className="mx-10 my-5 text-2xl font-semibold">See Your Purchases!!</div>
      <table className="w-[75vw] mx-10 mt-5 border  border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-8 border-b">Date of purchase</th>
            <th className="py-2 px-8 border-b">Seller Name</th>
            <th className="py-2 px-8 border-b">Seller Number</th>

            <th className="py-2 px-8 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.dateOfPurchase}</td>
              <td>{item.sellerName}</td>
              <td>{item.sellerNumber}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
