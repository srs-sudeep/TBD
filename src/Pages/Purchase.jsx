import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
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
    <div>
      <Link to="/purchaseform">
        <button>Add Purchase!</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Seller Name</th>
            <th>Seller Number</th>

            <th>Amount</th>
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
  );
}
