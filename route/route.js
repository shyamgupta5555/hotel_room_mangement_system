const express = require("express")
const route = express.Router()
const {createUser ,login} = require("../controller/userController")

const {createHotel}=require("../controller/hotelController")
const {createRoomBooking ,getRoomBookingRequest ,getRoomBookingStatus ,updateRoomBookingStatus}=require("../controller/roomBooking")
const {createAvailabilityInHotel,getAvailabilityInHotel}=require("../controller/hotelAvailability")
const {auth1,auth2} = require("../middleware/authenticated")




// user api

route.post("/api/accounts/register" ,createUser)
route.post("/api/accounts/login" ,login)

// hotel creation

route.post("/api/accounts/hotel" ,createHotel )

// hotel availability
route.post("/api/hotel/availability" ,createAvailabilityInHotel )

// booking hotel

route.post("/api/hotel/room/booking" ,auth1 ,auth2 ,createRoomBooking )

//  get api find by request
route.get("/user/:userId/room/:bookingId" ,getRoomBookingRequest )

// put api update status update by hotel

route.put("/api/room/:bookingId" , updateRoomBookingStatus)


// hotel availability
route.get("/api/hotel/:hotelId" ,getAvailabilityInHotel)

route.all("/" ,(req,res)=>{
  return res.status(400).send({message :"url wrong"})
})





module.exports = route