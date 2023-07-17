import React, { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, doc, getDoc, runTransaction, setDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const SaleForm = () => {
  const navigate = useNavigate();

  const [dateOfSale, setDateOfSale] = useState("");
  const [amount, setAmount] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerNumber, setBuyerNumber] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    modelNumber: "",
    brandName: "",
    quantity: "",
    amount: "",
    gstApplicable: "",
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    setItems([...items, newItem]);
    setNewItem({
      modelNumber: "",
      brandName: "",
      quantity: "",
      amount: "",
      gstApplicable: "",
    });
  };

  const handleRemoveItem = (event, index) => {
    event.preventDefault();
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleChangeItemQuantity = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = value;
    setItems(updatedItems);
  };

  const handleChangeItemModelNumber = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].modelNumber = value;
    setItems(updatedItems);
  };

  const handleChangeItemBrandName = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].brandName = value;
    setItems(updatedItems);
  };

  const handleChangeItemAmount = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].amount = value;
    setItems(updatedItems);
  };

  const handleChangeItemGST = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].gstApplicable = value;
    setItems(updatedItems);
  };

  const { user } = UserAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      dateOfSale,
      amount,
      buyerName,
      [...items],
      buyerAddress,
      buyerNumber
    );

    const addSale = async () => {
      try {
        await addDoc(collection(db, `tbd-database/${user.uid}/sale`), {
          dateOfSale: dateOfSale,
          amount: amount,
          items: [...items],
          buyerName: buyerName,
          buyerAddress: buyerAddress,
          buyerNumber: buyerNumber,
        });
        
        items.map(async (item) => {
          const ref = doc(
            db,
            `tbd-database/${user.uid}/inventory`, item.modelNumber
          );
          const docSnap = await getDoc(ref);
          if (docSnap.exists()) {
            await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(ref);

              const newCount = (
                Number(sfDoc.data().quantity) - Number(item.quantity)
              ).toString();
              transaction.update(ref, { quantity: newCount });
            });
          } else {
            await setDoc(ref, {
              brandName: item.brandName,
              modelNumber: item.modelNumber,
              quantity: item.quantity,
              amount: item.amount,
              gstApplicable: item.gstApplicable,
            });
          }
        });

        return; 
      } catch (e) {
        console.log(e.message);
      }
    };

    addSale(user);
    
    navigate("/sale");
  };

  return (
    <div className="flex flex-row">
    <Sidebar />
    <div className="right-div flex flex-col gap-2 pt-4 ml-10">
    <div className="text-2xl font-bold mb-4">Yayyy! New Sale</div>
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

      <label className="block text-gray-700 text-sm font-bold mb-2">Date of Sale</label>
      <input
      className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="date"
        name="dateOfSale"
        placeholder="mm/dd/yyyy"
        value={dateOfSale}
        onChange={(e) => setDateOfSale(e.target.value)}
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
      <input
      className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        name="amount"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <h2>Item List</h2>
        {items.map((item, index) => (
          <div key={index}>
            <input
            className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Model Number"
              value={item.modelNumber}
              onChange={(event) =>
                handleChangeItemModelNumber(index, event.target.value)
              }
            />
            <input
            className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(event) =>
                handleChangeItemQuantity(index, event.target.value)
              }
              required
            />
            <input
            className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Brand Name"
              value={item.brandName}
              onChange={(event) =>
                handleChangeItemBrandName(index, event.target.value)
              }
            />
            <input
            className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Amount"
              value={item.amount}
              onChange={(event) =>
                handleChangeItemAmount(index, event.target.value)
              }
            />
            <input
            className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Applicable GST"
              value={item.gstApplicable}
              onChange={(event) =>
                handleChangeItemGST(index, event.target.value)
              }
            />
            <button
            className="my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
             onClick={(event) => handleRemoveItem(event, index)}>Remove</button>
          </div>
        ))}
        <div>
          <input
          className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Model Number"
            value={newItem.modelNumber}
            onChange={(event) =>
              setNewItem({ ...newItem, modelNumber: event.target.value })
            }
          />
          <input
          className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(event) =>
              setNewItem({ ...newItem, quantity: event.target.value })
            }
          />
          <input
          className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Brand Name"
            value={newItem.brandName}
            onChange={(event) =>
              setNewItem({ ...newItem, brandName: event.target.value })
            }
          />
          <input
          className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Applicable GST"
            value={newItem.gstApplicable}
            onChange={(event) =>
              setNewItem({ ...newItem, gstApplicable: event.target.value })
            }
          />
          <input
          className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Amount (Per Piece)"
            value={newItem.amount}
            onChange={(event) =>
              setNewItem({ ...newItem, amount: event.target.value })
            }
          />
          <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
           onClick={(event) => {handleAddItem(event)}}>Add Item</button>
        </div>
      </div>

      <label className="block text-gray-700 text-sm font-bold mb-2">Buyer Name</label>
      <input
      className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="buyerName"
        placeholder="John Doe"
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">Buyer Address</label>
      <input
      className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="buyerAddress"
        placeholder="House Number, Society/street, sector, district, state"
        value={buyerAddress}
        onChange={(e) => setBuyerAddress(e.target.value)}
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">Buyer Number</label>
      <input
      className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="Buyer Number"
        placeholder="49582468686"
        value={buyerNumber}
        onChange={(e) => setBuyerNumber(e.target.value)}
      />
      <input className="button_tryout_for_form shadow-none" type="submit" value="Submit" />
    </form>
    </div>
    </div>
  );
};

export default SaleForm;
