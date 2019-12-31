/**
 * This file contains all the routes that our react client can connect too make requests to our database.
 */

const express = require("express");
const router = express.Router();
const pool = require("./db");
const Pusher = require('pusher');
const secret = require('./secret').secret;

console.log(secret);

var pusher = new Pusher({
  appId: secret.REACT_APP_PUSHER_APP_ID,
  key: secret.REACT_APP_PUSHER_APP_KEY,
  secret: secret.REACT_APP_PUSHER_APP_SECRET,
  cluster: secret.REACT_APP_PUSHER_APP_CLUSTER,
  encrypted: true
});

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

router.get("/visits", (req, res) => {
  pool.query(`SELECT * FROM visits`, (queryErr, queryRes) => {
    if (queryErr) {
      console.log(queryErr);
    }

    //Converts query result to json to be used in client
    res.json(queryRes.rows);
  });
});

router.post("/");

//_____________PUSHER______________

router.post("/add_visit", (req, res) => {
  const payload = req.body;

  pusher.trigger(payload.channel, 'player-count', {
    "name": payload.channel
  });
});

module.exports = router;
