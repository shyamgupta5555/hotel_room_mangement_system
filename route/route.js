const express = require("express")
const route = express.Router()
const {createUser ,login} = require("../controller/userController")

const {createHotel}=require("../controller/hotelController")
const {createRoomBooking ,getRoomBookingRequest ,getRoomBookingStatus}=require("../controller/roomBooking")
const {createAvailabilityInHotel}=require("../controller/hotelAvailability")
const {auth1,auth2} = require("../middleware/authenticated")


 

// user api

route.post("api/accounts/register" ,createUser)
route.post("api/accounts/login" ,login)

// hotel creation

route.post("api/accounts/hotel" ,createHotel )

// hotel availability
route.post("api/hotel/availability" ,createAvailabilityInHotel )

// booking hotel

route.post("api/hotel/room/booking" ,auth1 ,auth2 ,createRoomBooking )

//  get api find by request
route.get("api/user/:userId/room/roomId" ,auth1 ,auth2,getRoomBookingRequest )

// put api update status update by hotel

route.put("api/hotel/:hotelId/room/roomId" ,getRoomBookingStatus )









module.exports = route