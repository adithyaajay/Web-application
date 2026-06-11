import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";
import Form16Upload from "../components/Form16Upload";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const [taxData, setTaxData] = useState({
    salary: 0,

    tds: 0,

    employer: "",
  });

  const chartData = {
    labels: ["Salary", "TDS"],

    datasets: [
      {
        label: "Amount",

        data: [taxData.salary, taxData.tds],
      },
    ],
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="cards">
          <Card
            title="Total Income"
            value={`₹ ${taxData.salary.toLocaleString()}`}
          />

          <Card title="TDS Paid" value={`₹ ${taxData.tds.toLocaleString()}`} />

          <Card title="Employer" value={taxData.employer || "Upload Form16"} />

          <Card title="Tax Status" value="Pending" />
        </div>

        <div className="section">
          <h2>Income Overview</h2>

          <Bar data={chartData} />
        </div>

        <div className="section">
          <Form16Upload setTaxData={setTaxData} />
        </div>

        <div className="section">
          <h2>ITR Summary</h2>

          <div className="summary">
            <p>
              Salary Income :
              <strong>₹ {taxData.salary.toLocaleString()}</strong>
            </p>

            <p>
              TDS Deducted :<strong>₹ {taxData.tds.toLocaleString()}</strong>
            </p>

            <p>
              Employer :<strong>{taxData.employer || "-"}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
