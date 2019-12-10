import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookingSchema = new Schema ({
    restaurantName : String,
    address : String,
    phoneNo: {
        type: Number,
        min: 0,
        max : 100000000, 
    },
    bookingTime:{
        type: Date
    },
    bookingDate: {
        type: Date
    },
});

export default mongoose.model('Bookings', BookingSchema);