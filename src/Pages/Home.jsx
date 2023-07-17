import React from "react";
import Sidebar from "../components/Sidebar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import "./css/Home.css";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { name: "Geek-o-mania", students: 1000 },
  ];

  return (
    <>
      <div className="flex flex-row gap-3">
        <Sidebar />
        <div className="right-div">
          <div className="flex flex-row gap-5">
            <div className="box">
              <div className="rectangle-wrapper">
                <div className="rectangle1">
                  <div className="text-wrapper">Current Balance</div>
                  <div className="price">
                    30000 <span className="dollar">$</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="rectangle-wrapper">
                <div className="rectangle2">
                  <div className="text-wrapper">Current Balance</div>
                  <div className="price">
                    30000 <span className="dollar">$</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="rectangle-wrapper">
                <div className="rectangle3">
                  <div className="text-wrapper">Current Balance</div>
                  <div className="price">
                    30000 <span className="dollar">$</span>
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
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <BarChart width={600} height={600} data={data}>
                  <Bar dataKey="students" fill="green" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </BarChart>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <BarChart width={600} height={600} data={data}>
                  <Bar dataKey="students" fill="green" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </BarChart>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Item Three
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
