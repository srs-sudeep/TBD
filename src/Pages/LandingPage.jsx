import React from 'react'
import { Link } from 'react-router-dom';

export default function 
() {
  return (
    <div>
        <p>
        <Link to='/signup' className='underline'>
            Sign up.
        </Link>
        </p>

        <p>
        <Link to='/signin' className='underline'>
            Sign In.
        </Link>
        </p>
    </div>
  )
}
