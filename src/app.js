const path = require("path");
const express = require("express");

const shortenURL = require("./modules/shortURL");

const app = express();

// To allow only required methods
const allowHTTPMethods = ["GET", "POST"];
app.use((req, res, next) => { 
  if (!allowHTTPMethods.includes(req.method)) {    
    console.error(`Got disallowed request ${req.method} ${req.url}`);
    return res.status(405).send("Method Not Allowed");
  } else { next(); }
});

// Serving static UI
app.use(express.static(path.join(__dirname, '../ui/build')));
  
// All server middleware routes go here
app.use("/", shortenURL);

// When path doesn't match
app.use((req, res) => {
	console.error(`Requested resource ${req.method} ${req.url} not found..!`);
	res.status(404).send("not allowed");
});

// Catch all errors here
app.use((err, req, res, next) => {
  console.error(`Got unexpected error in route ${req.method} ${req.url} ERROR::${err.stack}`);
  res.status(500).send("Something went wrong, please try later");
});

module.exports = app;
