import React from "react";
import "./css/Sidebar.css";
import * as assets from "../assets";

function Sidebar() {
  return (
    <div className="sidebarcontainer">
      <div className="sidebarbox">
        <div className="sidetabs">
          <ul>
            <li>
              <img src={assets.dasboard} alt="dashboardicon" />
              Dashboard
            </li>
            <li> <img src={assets.Box_open} alt="inventoryicon" />
              Inventory</li>
            <li> <img src={assets.Money} alt="salesicon" />
              Sales</li>
            <li> <img src={assets.Bag} alt="purchaseicon" />
              Purchases</li>
            <li> <img src={assets.Group} alt="groupicon" />
              Customers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
