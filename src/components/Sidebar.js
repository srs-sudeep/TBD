import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-10'>
        <Link to='/home' className='underline'>
        Home
      </Link>
        <Link to='/inventory' className='underline'>
        Inventory
      </Link>
      <Link to='/sale' className='underline'>
        sales
      </Link>
      <Link to='/purchase' className='underline'>
        purchase
      </Link>
      <Link to='/profile' className='underline'>
        Profile
      </Link>
    </div>
  );
};

export default Sidebar;