import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import "./css/Home.css";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="mx-10"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Home = () => {
  const [value, setValue] = React.useState(0);
  const [yearlySale, setyearlySale] = useState(0);
  const [profit,setProfit] = useState(0);
  const [yearlyPurchase, setyearlyPurchase] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [monthlyPurchase, setMonthlyPurchase] = useState([]);
  const { user } = UserAuth();
  useEffect(() => {
    const fetchMonthlySales = async () => {
      const ref = collection(db, `tbd-database/${user.uid}/sale`);
      const snapshot = await getDocs(ref);
      const salesData = snapshot.docs.map((doc) => doc.data());

      const monthlySalesData = salesData.reduce((result, sale) => {
        if (sale.dateOfSale) {
          const dateParts = sale.dateOfSale.split("-");
          const month = parseInt(dateParts[1]);
          const year = parseInt(dateParts[0]);
          const monthYear = `${getMonthName(month)} ${year}`;

          if (result[monthYear]) {
            result[monthYear] += Number(sale.amount);
          } else {
            result[monthYear] = Number(sale.amount);
          }
        }

        return result;
      }, {});
      const yearlySale = Object.values(monthlySalesData).reduce(
        (total, amount) => total + amount,
        0
      );
      setyearlySale(yearlySale);
      setMonthlySales(Object.entries(monthlySalesData));
    };

    fetchMonthlySales();
  }, [user.uid]);
  useEffect(() => {
    const fetchMonthlyPurchase = async () => {
      const ref = collection(db, `tbd-database/${user.uid}/purchase`);
      const snapshot = await getDocs(ref);
      const purchaseData = snapshot.docs.map((doc) => doc.data());

      const monthlyPurchaseData = purchaseData.reduce((result, sale) => {
        if (sale.dateOfPurchase) {
          const dateParts = sale.dateOfPurchase.split("-");
          const month = parseInt(dateParts[1]);
          const year = parseInt(dateParts[0]);
          const monthYear = `${getMonthName(month)} ${year}`;

          if (result[monthYear]) {
            result[monthYear] += Number(sale.amount);
          } else {
            result[monthYear] = Number(sale.amount);
          }
        }

        return result;
      }, {});
      const yearlyPurchase = Object.values(monthlyPurchaseData).reduce(
        (total, amount) => total + amount,
        0
      );
      setyearlyPurchase(yearlyPurchase);
      setMonthlyPurchase(Object.entries(monthlyPurchaseData));
    };

    fetchMonthlyPurchase();
  }, [user.uid]);
  
  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[month - 1];
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = monthlySales.map(([monthYear, amount]) => ({
    month: monthYear,
    sale: amount,
  }));
  const data2 = monthlyPurchase.map(([monthYear, amount]) => ({
    month: monthYear,
    purchase: amount,
  }));
  console.log(data);
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="right-div mx-10">
          <div className=" mt-5 mb-8 text-4xl font-bold">Dashboard</div>
          <div className="flex flex-row gap-5">
            <div className="box">
              <div className="rectangle-wrapper">
                <div className="rectangle1">
                  <div className="text-wrapper">Total Sale</div>
                  <div className="price">
                    <span className="dollar">&#8377;</span>
                    {yearlySale}
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="rectangle-wrapper">
                <div className="rectangle2">
                  <div className="text-wrapper">Total Purchase</div>
                  <div className="price">
                    <span className="dollar">&#8377;</span>
                    {yearlyPurchase}
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="rectangle-wrapper">
                <div className="rectangle3">
                  <div className="text-wrapper">Total Profit</div>
                  <div className="price">
                  <span className="dollar">&#8377;</span>
                    {yearlySale-yearlyPurchase}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Sale for this year" {...a11yProps(0)} />
                  <Tab label="Purchase for this year" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <BarChart width={600} height={600} data={data}>
                  <Bar dataKey="sale" fill=" #26E3C24F" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                </BarChart>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <BarChart width={600} height={600} data={data2}>
                  <Bar dataKey="purchase" fill="#45A0F5" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                </BarChart>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
