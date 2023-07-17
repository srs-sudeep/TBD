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
    <div className='flex flex-col max-w-[700px] mx-[auto] mt-2 mb-2 w-[30vw] px-12 pt-8 pb-4 bg-slate-50 shadow-md rounded-md '>
      <h1 className='m-auto text-3xl pb-6 font-semibold'>Company Details</h1>
    <form className='flex flex-col align-center justify-between' onSubmit={handleSubmit}>
      <div  className='flex flex-col py-2 focus-within:font-bold'>
      <label className='py-2 text-1xl' htmlFor="companyName">Company Name:</label>
      <input
      className='border p-3 rounded-md shadow-sm'
        type="text"
        id="companyName"
        name="companyName"
        value={companyName}
        onChange={(event) => setCompanyName(event.target.value)}
      />
      </div>
      <div  className='flex flex-col py-2 focus-within:font-bold'>
      <label className='py-2 text-1xl focus-within:font-semibold' htmlFor="contactNo">Contact Number:</label>
      <input
      className='border p-3 rounded-md shadow-sm'
        type="text"
        id="contactNo"
        name="contactNo"
        value={contactNo}
        onChange={(event) => setContactNo(event.target.value)}
      />
      </div>
      <div className='flex flex-col py-2 focus-within:font-bold'>
      <label className='pt-1 text-1xl focus-within:font-semibold' htmlFor="address">Address:</label>
      <textarea
      className='border p-3 rounded-md shadow-sm'
        id="address"
        name="address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      ></textarea>
      </div>
      <div  className='flex flex-col py-2 focus-within:font-bold'>
      <label className='pt-1 text-1xl focus-within:font-semibold' htmlFor="companyOwner">Company Owner:</label>
      <input
      className='border p-3 rounded-md shadow-sm'
        type="text"
        id="companyOwner"
        name="companyOwner"
        value={companyOwner}
        onChange={(event) => setCompanyOwner(event.target.value)}
      />
      </div>

      <input className="button_tryout_for_form shadow-md w-[200px]" type="submit" value="Submit" />
    </form>
    </div>
  );
}

export default CompanyDetails;
