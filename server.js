const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();
require('./config/db');

const router = require("./router"); 

const port = process.env.PORT || 8080; // default fallback

app.use(cors()); 
app.use(bodyParser.json()); 

app.get('/api', (req, res) => {
  res.send("server is on at 8080");
});

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

app.use('/api', router); // ✅ Includes everything from /router/index.js

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
