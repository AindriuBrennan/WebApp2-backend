import "./db";
import http from "http";
import dotenv from "dotenv";
// import passport from "./auth/index";

// require ('./db');
// const http = require ('http');
// const dotenv = require('dotenv');
// const passport = require('./auth');

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser')

dotenv.config();

// const app = express();

// app.use(passport.initialize());

// eslint-disable-next-line
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello world");
});

server.listen(port);

console.log(`server sucessfully running on port ${port}`);
