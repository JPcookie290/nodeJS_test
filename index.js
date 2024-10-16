"use strict";

const http = require("node:http");
const fs = require("fs");
const { read } = require("node:fs");
const PORT = process.env.PORT || 3000;

const routes = ["/about", "/contact-me", "/"];

const readFile = (filename, res) => {
  fs.readFile(filename, (err, data) => {
    if (!err && data) {
      res.writeHead(200, { "Content-Type": "text/html" }); // sets the Header with content type
      res.write(data);
      return res.end();
    }
    res.writeHead(404, { "Content-Type": "text/html" });
    console.log("Sorry, something went wrong");
    return res.end();
  });
};

http
  .createServer((req, res) => {
    const baseUrl = "http://" + req.headers.host + "/";
    const url = new URL(req.url, baseUrl);
    const filename = "." + url.pathname + ".html";
    if (url.pathname === "/") {
      readFile("index.html", res);
      return;
    }
    if (!routes.includes(url.pathname)) {
      // Path to 404 page if url.pathname is not included in the routes array
      readFile("404.html", res);
      return;
    }
    readFile(filename, res);
    console.log(url);
  })
  .listen(PORT, () => console.log(`Server running at Port: ${PORT}`));
