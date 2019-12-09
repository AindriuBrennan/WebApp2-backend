import express from 'express';
import { bookings } from './bookings';

const router = express.Router(); //eslint-disable-line
router.get('/', (req,res) => {
    res.send({bookings:bookings});
});

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

export default router;