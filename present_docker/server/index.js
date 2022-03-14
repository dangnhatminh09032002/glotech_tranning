const express = require("express");
const pool = require("./db");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/create-table", async (req, res) => {
  try {
    pool
      .query(
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL)"
      )
      .then((result) => {
        res.send("Create table successfully");
      });
  } catch (error) {
    res.send("ERR create-table");
  }
});

app.get("/get-user", async (req, res) => {
  try {
    pool.query("SELECT * FROM users").then((result) => {
      res.send(result.rows);
    });
  } catch (error) {
    res.send("ERR get-employees");
  }
});

app.post("/add-user", async (req, res) => {
  try {
    const user = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [req.body.name, req.body.email, req.body.password]
    );
    res.send("Add user successfully");
  } catch (error) {
    res.send("ERR add-employee");
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
