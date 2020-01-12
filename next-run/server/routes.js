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

const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:a397f28d-1285-488b-97bb-070321f261bf",
  key:
    "83bb6462-159b-4684-b510-f50386e4bf20:Zlblmj8vDCsXSvfSH0ntmJx+x5PoD9DLwV5Bar7DsSk="
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
    } else {
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

  pool.query(
    `SELECT * FROM visits where court_id = ${court_id}`,
    (queryErr, queryRes) => {
      if (queryErr) {
        console.log(queryErr);
      }
      res.json(queryRes.rows);
    }
  );
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
      if (queryErr) {
        console.log(queryErr);
      } else {
        res.json(queryRes.rows);
      }
    }
  );

  //Broadcasts Court name that obtained extra visit
  pusher.trigger(channel, "player-count", {
    name: court.name
  });
});

router.post("/pusher/auth", function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var data = { court: `court 1`, count: 1 };
  var auth = pusher.authenticate(socketId, channel, data);
  res.send(auth);
});

/**
 * increase player count of court by 1
 */
router.post("/updatePlayerCounts", (req, res) => {
  const courtName = req.body.courtName;
  const channel = req.body.channel;

  console.log(channel, courtName)

  //Broadcast location to all clients
  pusher.trigger(channel, "increment-court", {
    courtToIncrement: courtName
  });

  res.send("increment broadcast-sent");
});

/**
 * decrease player count of court by 1;
 */
router.post("/updatePlayerCounts/leaveCourt", (req, res) => {
  const courtName = req.body.courtName;
  const channel = req.body.channel;

  pusher.trigger(channel, "decrement-court", {
    courtToDecrement: courtName
  });

  res.send("decrement-broadcast-sent");
});

/**
 * Get last 50 messages of chat for court with court_id
 */
router.get("/chat/getMessages/:court_id", (req, res) => {
  const params = req.params;
  const court_id = params.court_id;

  pool.query(
    `SELECT * FROM messages where court_id = ${court_id} order by times_stamp desc limit 10`,
    (queryErr, queryRes) => {
      if (queryErr) {
        console.log(queryErr);
      }
      else{
      //Converts query result to json to be used in client
      res.json(queryRes.rows);
      }
    }
  );
});

router.post("/chat/send", (req, res) => {
  const message = req.body.message;
  const channel = req.body.channel;
  const court_id = req.body.court_id;

  pool.query(
    `insert into messages (court_id, content, times_stamp) values (${court_id}, '${message}', current_timestamp)`,
    (queryErr, queryRes) => {
      if (queryErr) {
        console.log(queryErr);
      } else {
        res.json(`Chat added to database`);
      }
    }
  );

  pusher.trigger(channel, "message", {
    incomingMessage: message
  });
});

router.post("/subscribe_to_room", (req, res) => {
  const roomName = req.body.courtName;
  const userId = req.body.userId;
  console.log(`Subscribe: ${userId}`);

  chatkit
    .addUsersToRoom({
      roomId: roomName,
      userIds: [`${userId}`]
    })
    .then(() => {
      console.log("added");
    })
    .catch(err => {
      console.error(err);
    });

  res.send(roomName);
});

router.post("/create_user", (req, res) => {
  const userId = req.body.userId;
  console.log(`New user created: ${userId}`);
  res.send(userId);

  chatkit
    .createUser({
      id: `${userId}`,
      name: `${userId}`
    })
    .then(() => {
      console.log("User created successfully");
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/rooms/getMessages", (req, res) => {
  const roomName = req.body.roomName;

  console.log(roomName);

  chatkit
    .fetchMultipartMessages({
      roomId: roomName,
      limit: 10
    })
    .then(messages => {
      console.log();

      let result = [];
      messages.forEach(message => {
        message.parts.forEach(part => {
          result.push({
            id: message.id,
            user_id: message.user_id,
            message: part.content
          });
        });
      });

      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
