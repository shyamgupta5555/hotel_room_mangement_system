const hotelAvailabilityModel = require("../model/hotelAvailabilityModel")
const hotelModel = require("../model/hotelModel")


exports.createAvailabilityInHotel = async (req,res)=>{
  try{
    
    const data = req.body
    let { hotel, dayOfWeek, openingTime, closingTime} = data
    if(!hotel)return res.status(400).send({message: "use valid hotel id"})
    if(!dayOfWeek)return res.status(400).send({message: "use valid hotel dayOfWeek"})
    if(!openingTime)return res.status(400).send({message: "use valid hotel openingTime"}) 
    if(!closingTime)return res.status(400).send({message: "use valid hotel closingTime"})

    let week = ["sunday" ,"monday" ,"tuesday" ,"wednesday" ,"friday","saturday"]
    dayOfWeek = dayOfWeek.toLowerCase()
     if(!week.includes(dayOfWeek))return res.status(400).send({message: "use valid week name"})

    const hotelId = await hotelModel.findOne({ _id : hotel });
    if (!hotelId)return res.status(400).send({ message: "hotel id not present our database" });

    const create = await hotelAvailabilityModel.updateOne({dayOfWeek :dayOfWeek ,hotel :hotel},{dayOfWeek :dayOfWeek},{upsert :true ,new:true})
    let obj ={create , hotelDetails :hotelId}
   return res.status(201).send(obj);
  } catch (err) {
   
    return res.status(500).send({ message: err.message });
  }
}





exports.getAvailabilityInHotel = async (req,res)=>{
  try{
  const id = req.params.hotelId
    // const hotelId = await hotelModel.findOne({ _id : id });
    // if (!hotelId)return res.status(400).send({ message: "hotel id not present our database" });

    const get = await hotelAvailabilityModel.find({hotel :id})

   return res.status(201).send(get);
  } catch (err) {
   
    return res.status(500).send({ message: err.message });
  }
}
