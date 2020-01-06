/**
 * This file contains all the routes that our react client can connect too make requests to our database.
 */

const express = require("express");
const router = express.Router();
const pool = require("./db");
const Pusher = require("pusher");
const secret = require("./secret").secret;

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
  pool.query(
    `SELECT * FROM courts where courts.id = $1`,
    [id],
    (queryErr, queryRes) => {
      if (queryErr) {
        console.log(queryErr);
      }

      //Converts query result to json to be used in client
      res.json(queryRes.rows[0]);
    }
  );
});

/**
 * Get all visits
 */
router.get("/visits", (req, res) => {
  pool.query(`SELECT * FROM visits`, (queryErr, queryRes) => {
    if (queryErr) {
      console.log(queryErr);
    }
    else{
      res.json(queryRes.rows);

    }

    //Converts query result to json to be used in client
  });
});

/**
 * Get all visits from a specific court
 */
router.get("/visits/:id", (req, res) => {
  const court_id = req.params.id;

  pool.query(`SELECT * FROM visits where court_id = ${court_id}`, (queryErr, queryRes) => {
    if(queryErr){
      console.log(queryErr);
    }
    res.json(queryRes.rows);
  })
});

router.get("/visits/:id/:hour", (req, res) => {
  const court_id = req.params.id;
  const hour = req.params.hour;

  console.log(court_id, hour);
  // pool.query(`SELECT * FROM `, ()=> {

  // });
});

router.post("/");

router.post("/add_visit", (req, res) => {
  const channel = req.body.channel;
  const court = req.body.court;

  pool.query(
    `insert into visits (court_id, times_stamp) values ('${court.id}', current_timestamp)`,
    (queryErr, queryRes) => {
      if(queryErr){
        console.log(queryErr);
      }
      else{
        res.json(queryRes.rows);        
      }
    }
  );

  //Broadcasts Court name that obtained extra visit
  pusher.trigger(channel, "player-count", {
    name: court.name
  });
});

router.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var data = {court: `court 1`, count: 1}
  var auth = pusher.authenticate(socketId, channel, data);
  res.send(auth);
});

/**
 * Broadcasts location to clients to update current player counts
 */
router.post('/updatePlayerCounts', (req, res) => {
  const incomingLocation =  req.body.geolocation;
  const channel = req.body.channel;
  
  //Broadcast location to all clients
  pusher.trigger(channel, 'transit', {
    incomingLocation: incomingLocation
  });
});

module.exports = router;
