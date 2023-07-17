import React from 'react';
import { Link } from 'react-router-dom';

export default function Sale() {
  return (
    <div>
        <Link to="/saleform">
        <button>
            Add Bill!
        </button>
            </Link>
    </div>
  )
}
