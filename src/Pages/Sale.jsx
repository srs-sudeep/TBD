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
      const ref = collection(db, `tbd-database/${user.uid}/sale`);
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
      <Link to="/saleform">
        <button>Add Bill!</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Date of sale</th>
            <th>Buyer Name</th>
            <th>Buyer Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.dateOfSale}</td>
              <td>{item.buyerName}</td>
              <td>{item.buyerNumber}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
