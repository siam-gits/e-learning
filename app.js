const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

// Use the CORS middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Allow requests from this origin
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "enrollment_system",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.post("/validate-enrollment-key", (req, res) => {
  const { key, course } = req.body; // Extract course name and key from request body
  console.log("Received course:", course);
  console.log("Received key:", key);

  // Adjust the SQL query based on the received course name
  let tableName;
  if (course === "Intermediate") {
    tableName = "intermediate_keys";
  } else if (course === "Degree") {
    tableName = "degree_keys";
  } else if (course === "Post Graduation") {
    tableName = "post_graduation_keys";
  } else {
    // Handle invalid course name
    res.status(403).send("Invalid course");
    return;
  }

  connection.query(
    `SELECT * FROM ${tableName} WHERE key_value = ?`,
    key,
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.length > 0) {
        res.send("Success"); // Send "Success" if key is found
      } else {
        res.status(403).send("Invalid enrollment key");
      }
    }
  );
});

// Define a route to handle GET requests
app.get("/validate-enrollment-id", (req, res) => {
  // Perform a query to retrieve users
  connection.query(
    "SELECT * FROM enrollment_keys",
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
      } else {
        res.json(results); // Send the retrieved users as JSON response
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
