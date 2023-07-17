import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../services/firebase'
import { collection, addDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CompanyDetails = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const [companyName, setCompanyName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [companyOwner, setCompanyOwner] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const createCompany = async () => {
      try{
        await addDoc(collection(db, `tbd-database/${user.uid}/companyDetails`), 
        {
          companyName: companyName,
          address: address,
          contactNo: contactNo,
          companyOwner: companyOwner,
        });
        return;
      }
      catch(e){
        console.log(e.message);
      }
    }

    createCompany(user);

    // Do something with the form values
    // For example, you can pass them to another function or send them to a server
    console.log('Company Name:', companyName);
    console.log('Contact Number:', contactNo);
    console.log('Address:', address);
    console.log('Company Owner:', companyOwner);

    // Reset the form fields
    setCompanyName('');
    setContactNo('');
    setAddress('');
    setCompanyOwner('');

    navigate('/home');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="companyName">Company Name:</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value={companyName}
        onChange={(event) => setCompanyName(event.target.value)}
      /><br /><br />

      <label htmlFor="contactNo">Contact Number:</label>
      <input
        type="text"
        id="contactNo"
        name="contactNo"
        value={contactNo}
        onChange={(event) => setContactNo(event.target.value)}
      /><br /><br />

      <label htmlFor="address">Address:</label>
      <textarea
        id="address"
        name="address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      ></textarea><br /><br />

      <label htmlFor="companyOwner">Company Owner:</label>
      <input
        type="text"
        id="companyOwner"
        name="companyOwner"
        value={companyOwner}
        onChange={(event) => setCompanyOwner(event.target.value)}
      /><br /><br />

      <input type="submit" value="Submit" />
    </form>
  );
}

export default CompanyDetails;
