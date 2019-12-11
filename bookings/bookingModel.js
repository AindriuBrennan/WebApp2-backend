import mongoose from "mongoose";
const Schema = mongoose.Schema;

//model for a booking collection
const BookingSchema = new Schema({
  bookingId: {
    type: Number,
    min: 1,
    max: 1000,
    unique: true
  },
  restaurantName: String,
  address: String,
  phoneNo: {
    type: Number,
    min: 0,
    max: 100000000
  },
  bookingTime: {
    type: Date
  },
  bookingDate: {
    type: Date
  }
});



export default mongoose.model("Booking", BookingSchema);
