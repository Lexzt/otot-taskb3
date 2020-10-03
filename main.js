// "use strict";
// const express = require("express");
// const app = express();
// app.get("/", (req, res) => res.send("Hello world!"));
// module.exports = app;

const express = require("express");
const app = express();

const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/get", (req, res) => {
  // console.log("By HTTP Specifications, successful GET has response");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://quotes.rest/qod", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
      const parsedJson = JSON.parse(result);
      if (parsedJson.error) {
        res.send(parsedJson.error.message);
      } else {
        res.send(parsedJson.contents.quotes[0].quote);
      }
    })
    .catch((error) => res.send("error" + error));
});

app.post("/post", (req, res) => {
  // console.log("By HTTP Specifications, successful POST has response");

  const objToSend = {};
  Object.keys(req.body).forEach((key) => {
    objToSend[key] =
      req.body[key].charAt(0).toUpperCase() + req.body[key].slice(1);
  });

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: objToSend,
    redirect: "follow",
  };

  fetch("https://postman-echo.com/post", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res.send(objToSend);
    })
    .catch((error) => res.send("error" + error));
});

app.put("/put", (req, res) => {
  // console.log("By HTTP Specifications, successful PUT has no response");

  const objToSend = {};
  Object.keys(req.body).forEach((key) => {
    objToSend[key] =
      req.body[key].charAt(0).toUpperCase() + req.body[key].slice(1);
  });

  var requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: objToSend,
    redirect: "follow",
  };

  fetch("https://postman-echo.com/put", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res.send();
    })
    .catch((error) => res.send("error" + error));
});

app.delete("/delete", (req, res) => {
  // console.log("By HTTP Specifications, successful DELETE has MAY have response");

  var requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: objToSend,
    redirect: "follow",
  };

  fetch("https://postman-echo.com/delete", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res.send();
    })
    .catch((error) => res.send("error" + error));
});

module.exports = app;
