import express from 'express';
import Booking from './bookingModel';
import asyncHandler from 'express-async-handler';




//get bookings
const router = express.Router(); //eslint-disable-line

//get all bookings using try/catch to handle any errors
router.get('/', async(req,res) => {
    try{
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    }catch(error){
        handleError(res.error.message);
    }
});

//create a booking using async handler
router.post('/', asyncHandler(async(req,res) => {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
}));

//edit a booking
router.put('/:id', asyncHandler(async(req,res) => {
    if(req.body._id) delete req.body._id;
    const booking = await Booking.update({
        _id:req.params.id, 
    }, req.body, {
        upsert:false,
    });
    if(!booking) return res.sendStatus(404);
    return res.json(200, booking);
}));

//delete a booking
router.delete('/:id', asyncHandler(async(req,res) =>{
    const booking = await Booking.findById(req.params.id);
    if(!booking)return res.send(404);
    await booking.remove();
    return res.status(204).send(booking);
}));


/**
 * Handle general errors
 * @param {object} res The Response object
 * @param {object} err The error object
 * @return {object} The response object
 */

 function handleError (res, err) {
     return res.send(500,err);
 }

// router.get('/', (req,res) => {
//     res.send({bookings:bookings});
// });
// //add a booking
// router.post('/',(req, res) => {
//     let newBooking = req.body;
//     if(newBooking) {
//         bookings.push({restaurantName:newBooking.restaurantName,
//                         address:newBooking.address,
//                         phoneNo:newBooking.phoneNo,
//                         bookingTime:newBooking.bookingTime,
//                         bookingDate:newBooking.bookingDate});
//         res.status(201).send({message:'New Booking Created'});
//     }else {
//         res.status(400).send({message:'Unable to find Booking in request, No Booking in body'})
//     }
// });

//update bookings

// router.put('/:id',(req,res) => {
//     const key = req.params.id;
//     const updateBooking = req.body;
//     const index = bookings.map((booking) => {
//         return booking.bookingTime;
//     }).indexOf(key);
//     if(index !== -1) {
//         bookings.splice(index,1,{name:updateBooking.restaurantName,
//                                 address:updateBooking.address,
//                                 phoneNo:updateBooking.phoneNo,
//                                 bookingTime:updateBooking.bookingTime,
//                                 bookingDate:updateBooking.bookingDate});
//         res.status(200).send({message:'Booking Updated'});
//     }else {
//         res.status(400).send({message:'Unable to find Booking in request'});
//     }
// });

// //delete a booking

// router.delete('/:id', (req,res) => {
//     const key = req.params.id;
//     const index = bookings.map((booking) => {
//         return booking.bookingTime;
//     }).indexOf(key);
//     if(index > -1) {
//         bookings.splice(index, 1);
//         res.status(200).send({message: ` Deleted a booking for ${key}`});
//     } else{
//         res.status(400).send({message:`Unable to find Bookinf for the time ${key}`});
//     }
// });

export default router;