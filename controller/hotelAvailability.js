const hotelAvailabilityModel = require("../model/hotelAvailabilityModel")
const hotelModel = require("../model/hotelModel")


exports.createAvailabilityInHotel = async (req,res)=>{
  try{
    
    const data = req.body
    const { hotel, dayOfWeek, openingTime, closingTime} = data
    const hotelId = await hotelModel.findOne({ _id : hotel });
    if (!hotelId)return res.status(400).send({ message: "hotel id not present our database" });

    const create = hotelAvailabilityModel.create(data)
   return res.status(201).send(create);

  } catch (err) {
   
    return res.status(500).send({ message: err.message });
  }
}