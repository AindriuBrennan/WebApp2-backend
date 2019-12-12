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



export default router;