import bookingModel from "./bookings/bookingModel";

const bookings = [
  { 
    restaurantName: "La Boheme",
    address: `2 George's Street Waterford`,
    phoneNo: "051 875645",
    bookingTime: "20:00",
    bookingDate: "17/12/19"
  },
  {
    
    restaurantName: "Emilianos",
    address: "22 High Street, Waterford",
    phoneNo: "051 820333",
    bookingTime: "18:45",
    bookingDate: "27/12/19"
  },
  {
    
    restaurantName: "Cafe Goa",
    address: "36 The Quay, Waterford",
    phoneNo: "051 304970",
    bookingTime: "19:30",
    bookingDate: "30/12/19"
  }
];

//initialise the database with bookings data
export default async function loadBookings() {
  try {
    await bookingModel.deleteMany();
    await bookingModel.insertMany(bookings);
    console.info(`${bookings.length} bookings inserted successfully`);
  } catch (err) {
    console.error(`Failed to load Bookings Data:${err}`);
  }
}
