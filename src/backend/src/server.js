import express from "express";
import cors from "cors";

import itrRoute from "../routes/itr.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/itr", itrRoute);
app.get("/", (req, res) => {
  res.send("ITR API Running");
});
app.listen(5000, () => {
  console.log("Server running on 5000");
});
