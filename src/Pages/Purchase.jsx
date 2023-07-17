import React from 'react';
import { Link } from 'react-router-dom';

export default function Sale() {
  return (
    <div>
        <Link to="/purchaseform">
        <button>
            Add Purchase!
        </button>
            </Link>
    </div>
  )
}
