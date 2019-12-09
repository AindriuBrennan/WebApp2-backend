import './db'
import http from 'http'
import dotenv from'dotenv'
import passport from './auth';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


dotenv.config()

const server = express();

server.use(passport.initialize());


const port = process.env.PORT

server.use()

const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello world');
});

server.listen(port);

console.log(`server sucessfully running on port ${port}`);