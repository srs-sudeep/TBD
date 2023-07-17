import React, { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, doc, getDoc, runTransaction, setDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>

      <label>Date of Sale</label>
      <input
        type="date"
        name="dateOfSale"
        placeholder="mm/dd/yyyy"
        value={dateOfSale}
        onChange={(e) => setDateOfSale(e.target.value)}
      />
      <label>Amount</label>
      <input
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
              type="text"
              placeholder="Model Number"
              value={item.modelNumber}
              onChange={(event) =>
                handleChangeItemModelNumber(index, event.target.value)
              }
            />
            <input
              type="text"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(event) =>
                handleChangeItemQuantity(index, event.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Brand Name"
              value={item.brandName}
              onChange={(event) =>
                handleChangeItemBrandName(index, event.target.value)
              }
            />
            <input
              type="text"
              placeholder="Amount"
              value={item.amount}
              onChange={(event) =>
                handleChangeItemAmount(index, event.target.value)
              }
            />
            <input
              type="text"
              placeholder="Applicable GST"
              value={item.gstApplicable}
              onChange={(event) =>
                handleChangeItemGST(index, event.target.value)
              }
            />
            <button onClick={(event) => handleRemoveItem(event, index)}>Remove</button>
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="Model Number"
            value={newItem.modelNumber}
            onChange={(event) =>
              setNewItem({ ...newItem, modelNumber: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(event) =>
              setNewItem({ ...newItem, quantity: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Brand Name"
            value={newItem.brandName}
            onChange={(event) =>
              setNewItem({ ...newItem, brandName: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Applicable GST"
            value={newItem.gstApplicable}
            onChange={(event) =>
              setNewItem({ ...newItem, gstApplicable: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Amount (Per Piece)"
            value={newItem.amount}
            onChange={(event) =>
              setNewItem({ ...newItem, amount: event.target.value })
            }
          />
          <button onClick={(event) => {handleAddItem(event)}}>Add Item</button>
        </div>
      </div>

      <label>Buyer Name</label>
      <input
        type="text"
        name="buyerName"
        placeholder="John Doe"
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
      />
      <label>Buyer Address</label>
      <input
        type="text"
        name="buyerAddress"
        placeholder="House Number, Society/street, sector, district, state"
        value={buyerAddress}
        onChange={(e) => setBuyerAddress(e.target.value)}
      />
      <label>Buyer Number</label>
      <input
        type="text"
        name="Buyer Number"
        placeholder="49582468686"
        value={buyerNumber}
        onChange={(e) => setBuyerNumber(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SaleForm;
