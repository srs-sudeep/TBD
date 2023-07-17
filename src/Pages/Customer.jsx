import React, { useEffect, useState } from "react";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  useEffect(() => {
    fetch("/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log("Error:", error));
  }, []);

  const handleEditCustomer = (customerId) => {
    setEditingCustomerId(customerId);
  };

  const handleSaveCustomer = (customerId, updatedCustomer) => {
    fetch(`/customers/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedCustomers = customers.map((customer) =>
          customer.id === customerId ? data : customer
        );
        setCustomers(updatedCustomers);
        setEditingCustomerId(null);
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleDeleteCustomer = (customerId) => {
    fetch(`/customers/${customerId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedCustomers = customers.filter(
          (customer) => customer.id !== customerId
        );
        setCustomers(updatedCustomers);
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleCancelEdit = () => {
    setEditingCustomerId(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                {editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(event) => {
                      const updatedCustomer = {
                        ...customer,
                        name: event.target.value,
                      };
                      handleSaveCustomer(customer.id, updatedCustomer);
                    }}
                  />
                ) : (
                  customer.name
                )}
              </td>
              <td>
                {editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={customer.email}
                    onChange={(event) => {
                      const updatedCustomer = {
                        ...customer,
                        email: event.target.value,
                      };
                      handleSaveCustomer(customer.id, updatedCustomer);
                    }}
                  />
                ) : (
                  customer.email
                )}
              </td>
              <td>
                {editingCustomerId === customer.id ? (
                  <>
                    <button
                      onClick={() => handleSaveCustomer(customer.id, customer)}
                    >
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditCustomer(customer.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCustomer(customer.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
