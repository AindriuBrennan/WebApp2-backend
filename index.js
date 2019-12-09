import "./db";
// import http from "http";
import dotenv from "dotenv";
import express from 'express';
import bookingsRouter from './bookings';
import bodyParser from 'body-parser';
// import passport from "./auth/index";



dotenv.config();

const server = express();

// app.use(passport.initialize());

// eslint-disable-next-line
const port = process.env.PORT;

server.use(express.static('public'));

//configure body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

//route for  getting bookings
server.use('/bookings',bookingsRouter);


server.listen(port), () => {
    console.info(`This Server is running at ${port}`);
};

console.log(`server sucessfully running on port ${port}`);