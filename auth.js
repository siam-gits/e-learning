const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// const multer = require("multer"); //http://expressjs.com/en/resources/middleware/multer.html npm install --save multer

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "elearning",
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});
app.get("/", (req, res) => {
  res.send("Hellow world");
});
app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO employee (name,email,address, salary,image) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.salary,
    req.file.filename,
  ];
  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Error singup query" });
    return res.json({ Status: "Success" });
  });
});
app.listen(3000, () => {
  console.log("Server is running");
});
