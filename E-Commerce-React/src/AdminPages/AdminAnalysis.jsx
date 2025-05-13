import { useState,useEffect } from "react";
import LineChart from "../AdminComponent/LineChart";
import LineChartUser from "./../AdminComponent/LineChartUser"
import axios from "axios";

function AdminAnalysis() {

  const [value,setValue]=useState([]);

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/order`);
        console.log(res);
        setValue(res.data.data);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();

  }, []);
    return (
  
        <div>
          <div>
          <LineChart value={value}/>
          </div>
          <div>
          <LineChartUser value={value}/>
          </div>
           
        </div>
    )
  }

export default AdminAnalysis;