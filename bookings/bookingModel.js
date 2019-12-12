import mongoose from "mongoose";
const Schema = mongoose.Schema;

//model for a booking collection
const BookingSchema = new Schema({ 
  restaurantName: String,
  address: String,
  phoneNo: {
    type: Number,
    min:1

  },
  bookingTime: {
    type: String
  },
  bookingDate: {
    type: String
  }
});



export default mongoose.model("Booking", BookingSchema);
