/**
 * This file contains all the routes that our react client can connect too make requests to our database.
 */

const express = require("express");
const router = express.Router();
const pool = require("./db");

router.get("/api/get/allcourts", (req, res, next) => {
  pool.query(`SELECT * FROM courts`, (queryErr, queryRes) => {
    if (queryErr) {
      console.log(queryErr);
    }
    console.log(queryRes.rows[0]);
    res.json(queryRes.rows[0]);
  });
});

module.exports = router;
