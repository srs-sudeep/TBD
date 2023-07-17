import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password)
      navigate('/home')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const tempfn = async () => {
    await getDocs(collection(db, "test_collection")).then((e) => {
      e.forEach((doc) => {
        console.log(doc.data());
      })
    });
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 w-[30vw] px-12 py-10 bg-slate-50 shadow-md rounded-md">
      <div>
        <h1 className='text-3xl font-bold py-2 '>Sign In</h1>
        <p className='py-1'>
          Don't have an account yet?{' '}
          <Link to='/signup' className='underline'>
            Sign up.
          </Link>
        </p>
      </div>
      <form className='flex flex-col align-center' onSubmit={handleSubmit}>
        <div className='flex flex-col py-2 focus-within:font-bold'>
          <label className='py-2 text-2xl'>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='border p-3 rounded-md shadow-sm'
            type="email"
          />
        </div>
        <div className='flex flex-col py-2 focus-within:font-bold'>
          <label className='py-2 text-2xl'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='border p-3 rounded-md shadow-sm'
            type="password"
          />
        </div>
        <button className="button_tryout_for_form shadow-md w-[200px]">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
