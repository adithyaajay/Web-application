import axios from "axios";

export default function Form16Upload({ setTaxData }) {
  const upload = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const fd = new FormData();

      fd.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/itr/upload",

        fd,
      );

      console.log(res.data);

      setTaxData(
        res.data?.data || {
          grossSalary: 0,

          taxableIncome: 0,

          tds: 0,

          employer: "",

          assessmentYear: "",
        },
      );
    } catch (err) {
      console.log(err);

      alert("Upload failed");
    }
  };

  return (
    <div className="upload-box">
      <h2>Upload Form16</h2>

      <input type="file" accept=".pdf" onChange={upload} />
    </div>
  );
}
