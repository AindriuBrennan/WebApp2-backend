import express from 'express';
import { bookings } from './bookings';


//get bookings
const router = express.Router(); //eslint-disable-line
router.get('/', (req,res) => {
    res.send({bookings:bookings});
});
//add a booking
router.post('/',(req, res) => {
    let newBooking = req.body;
    if(newBooking) {
        bookings.push({restaurantName:newBooking.restaurantName,
                        address:newBooking.address,
                        phoneNo:newBooking.phoneNo,
                        bookingTime:newBooking.bookingTime,
                        bookingDate:newBooking.bookingDate});
        res.status(201).send({message:'New Booking Created'});
    }else {
        res.status(400).send({message:'Unable to find Booking in request, No Booking in body'})
    }
});

//update bookings

router.put('/:id',(req,res) => {
    const key = req.params.id;
    const updateBooking = req.body;
    const index = bookings.map((booking) => {
        return booking.bookingTime;
    }).indexOf(key);
    if(index !== -1) {
        bookings.splice(index,1,{name:updateBooking.restaurantName,
                                address:updateBooking.address,
                                phoneNo:updateBooking.phoneNo,
                                bookingTime:updateBooking.bookingTime,
                                bookingDate:updateBooking.bookingDate});
        res.status(200).send({message:'Booking Updated'});
    }else {
        res.status(400).send({message:'Unable to find Booking in request'});
    }
});

//delete a booking

router.delete('/:id', (req,res) => {
    const key = req.params.id;
    const index = bookings.map((booking) => {
        return booking.bookingTime;
    }).indexOf(key);
    if(index > -1) {
        bookings.splice(index, 1);
        res.status(200).send({message: ` Deleted a booking for ${key}`});
    } else{
        res.status(400).send({message:`Unable to find Bookinf for the time ${key}`});
    }
});

export default router;