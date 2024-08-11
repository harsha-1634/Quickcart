import { useMemo, useState,useEffect } from "react";
import "./chart.css";
import {userRequest} from "../../requestMethods";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {
  const [userstats,setUserstats]=useState([]);

  const MONTHS=useMemo(
    ()=>[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(()=>{
    const getStats=async()=>{
      try{
        const res=await userRequest.get("/users/stats")
        const s=res.data.map(item=>({
          name: MONTHS[item._id - 1],
          "Active User": item.total,
        }));
        setUserstats(s);
      } catch{}
    };
    getStats();
  },[MONTHS]);



  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={userstats}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
