import { useState } from "react";
import Form16Upload from "../components/Form16Upload";

export default function Dashboard() {
  const [data, setData] = useState({
    grossSalary: 0,
    taxableIncome: 0,
    tds: 0,
    employer: "",
    assessmentYear: "",
  });

  return (
    <div className="main">
      <h1>ITR Filing Assistant</h1>

      <div className="cards">
        <div className="tax-card">
          <h4>Gross Salary</h4>

          <h2>₹ {(data?.grossSalary || 0).toLocaleString()}</h2>
        </div>

        <div className="tax-card">
          <h4>Taxable Income</h4>

          <h2>₹ {(data?.taxableIncome || 0).toLocaleString()}</h2>
        </div>

        <div className="tax-card">
          <h4>TDS Paid</h4>

          <h2>₹ {(data?.tds || 0).toLocaleString()}</h2>
        </div>

        <div className="tax-card">
          <h4>Assessment Year</h4>

          <h2>{data?.assessmentYear || "-"}</h2>
        </div>
      </div>

      <Form16Upload setTaxData={setData} />

      <div className="section">
        <h2>Employer</h2>

        <p>{data?.employer || "Upload Form16"}</p>
      </div>
    </div>
  );
}
