import React, { useState } from "react";

const InventoryForm = () => {
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [amount, setAmount] = useState("");
  const [itemsPurchased, setItemsPurchased] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dateOfPurchase, amount, itemsPurchased, customerName, customerAddress, contactNumber);
  };

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      <label>Date of Purchase</label>
      <input
        type="date"
        name="dateOfPurchase"
        placeholder="mm/dd/yyyy"
        value={dateOfPurchase}
        onChange={(e) => setDateOfPurchase(e.target.value)}
      />
      <label>Amount</label>
      <input
        type="number"
        name="amount"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label>Items Purchased</label>
      <input
        type="text"
        name="itemsPurchased"
        placeholder="Item 1, Item 2, Item 3"
        value={itemsPurchased}
        onChange={(e) => setItemsPurchased(e.target.value)}
      />
      <label>Customer Name</label>
      <input
        type="text"
        name="customerName"
        placeholder="John Doe"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <label>Customer Address</label>
      <input
        type="text"
        name="CustomerAddress"
        placeholder="House Number, Society/street, sector, district, state"
        value={customerName}
        onChange={(e) => setCustomerAddress(e.target.value)}
      />
      <label>Customer Number</label>
      <input
        type="text"
        name="Contact Number"
        placeholder="49582468686"
        value={customerName}
        onChange={(e) => setContactNumber(e.target.value)}
      />
    <input type="submit" value="Submit" />
    </form>
    );
};

export default InventoryForm;