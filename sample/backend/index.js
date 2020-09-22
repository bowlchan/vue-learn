const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const data = [
  {
    id: 3,
    message: "よく考えたら休日だった😇",
    date: "2020-09-05T01:44:00.000Z"
  },
  {
    id: 2,
    message: "ご飯食べる時間ない🥺ぴえん",
    date: "2020-09-05T01:41:00.000Z"
  },
  {
    id: 1,
    message: "やばい寝坊した😱",
    date: "2020-09-05T01:40:00.000Z"
  }
];

app.use(bodyParser.json());
app.use(cors());

app.get("/api/tweets", (req, res) => {
  res.json(data);
});

app.post("/api/tweets", (req, res) => {
  const message = req.body.message;
  if (!message) {
    res.status(400).json({ error: "property message is required" });
    return;
  }
  if (message.length <= 0 || message.length > 140) {
    res.status(400).json({ error: "message length must be in range 0-140" });
    return;
  }
  const tweet = {
    id: Math.max(...data.map(item => item.id)) + 1,
    message: message,
    date: new Date().toISOString()
  };
  data.unshift(tweet);
  res.json(tweet);
})

app.listen(port);
console.log("listening on port " + port);
