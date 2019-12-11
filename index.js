import "./db";
import dotenv from "dotenv";
import express from 'express';
import bookingsRouter from './bookings';
import userRouter from './users/index';
import bodyParser from 'body-parser';
import cors from 'cors';
import loadBookings from './bookingData';
import loadUsers from './userData';
// import passport from "./auth/index";



dotenv.config();

const server = express();

// app.use(passport.initialize());

server.use(cors());
// eslint-disable-next-line
const port = process.env.PORT;


server.use(express.static('public'));

//configure body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

//route for  getting bookings
server.use('/bookings',bookingsRouter);

//route for getting users
server.use('/users', userRouter);

//load the booking data and user login details to the mongo backend

if(process.env.seedDb){
    loadBookings();
    loadUsers();
}




server.listen(port), () => {
    console.info(`This Server is running at ${port}`);
};

console.log(`server sucessfully running on port ${port}`);