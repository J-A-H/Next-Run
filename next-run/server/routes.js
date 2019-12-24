/**
 * This file contains all the routes that our react client can connect too make requests to our database.
 */

const express = require("express");
const router = express.Router();
const pool = require("./db");

/**
 * Gets all courts in court table
 */
router.get("/courts", (req, res) => {
  pool.query(`SELECT * FROM courts`, (queryErr, queryRes) => {
    if (queryErr) {
      console.log(queryErr);
    }

    //Converts query result to json to be used in client
    res.json(queryRes.rows);
  });
});

router.get("/courts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(`SELECT * FROM courts where courts.id = $1`, [id], (queryErr, queryRes) => {
    if (queryErr) {
      console.log(queryErr);
    }

    //Converts query result to json to be used in client
    res.json(queryRes.rows[0]);
  });
});


module.exports = router;
