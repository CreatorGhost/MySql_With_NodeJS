console.log("Hello World");

// importing express
const express = require("express");
const app = express("");

// importing body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// importing mysql
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

// display all the data from database test
app.get("/", (req, res) => {
  connection.query("SELECT * FROM Persons", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

// get data with id
app.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM Persons WHERE PersonID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      else res.send(rows);
    }
  );
});

// insert data into database
app.post("/", (req, res) => {
  connection.query(
    "Insert into Persons set ?",
    req.body,
    (err, rows, fields) => {
      if (err) throw err;
      else res.send(rows);
    }
  );
});

// Delete data from database
app.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM Persons WHERE PersonID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      else res.send("Deleted the column with id: " + req.params.id);
    }
  );
});

// getting the port
const port = process.env.PORT || 4000;
// runing the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
