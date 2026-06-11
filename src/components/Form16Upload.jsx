import { useState } from "react";

import axios from "axios";

export default function Form16Upload({ setTaxData }) {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Select Form16 PDF");

      return;
    }

    const formData = new FormData();

    formData.append(
      "file",

      file,
    );

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/itr/upload",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      setTaxData({
        salary: response.data.data.salary || 0,

        tds: response.data.data.tds || 0,

        employer: response.data.data.employer || "",
      });
    } catch (error) {
      console.log(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-box">
      <h2>Upload Form16</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadFile}>
        {loading ? "Processing PDF..." : "Upload Form16"}
      </button>
    </div>
  );
}
