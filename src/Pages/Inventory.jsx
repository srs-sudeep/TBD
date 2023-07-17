import React from 'react';
import { Link } from 'react-router-dom';

export default function Inventory() {
  return (
    <div>
        <Link to="/inventoryform">
        <button>
            Add Inventory!
        </button>
            </Link>
    </div>
  )
}
