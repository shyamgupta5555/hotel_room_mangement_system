const roomBookingModel= require("../model/roomBookingModel")
const hotelModel = require("../model/hotelModel")
const userModel = require("../model/userModel")



exports.createRoomBooking = async (req,res)=>{
  try{
    const data = req.body
    const {user, hotel ,requestedDate } = data
   
    if(!hotel)return res.status(400).send({message :"hotel required"})
    if(!requestedDate)return res.status(400).send({message :"requestedDate required"})

    const hotelId = await hotelModel.findOne({ _id : hotel });
    if (!hotelId)return res.status(400).send({ message: "hotel id not present our database" });
    data.status = "Pending"

    const create = await roomBookingModel.create(data)
   return res.status(201).send(create);

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}


exports.getRoomBookingRequest = async (req,res)=>{
  try{
    const id = req.params.userId
    let data = await roomBookingModel.findOne({user :id})
    if(!data)return res.status(200).send({message : "user not any request"})
    return res.status(200).send({data : data})

  }catch(err){
    return res.status(500).send({ message: err.message });

  }
}


exports.getRoomBookingStatus = async (req,res)=>{
  try{
    const id = req.params.bookingId
    let data = await roomBookingModel.findById({ _id : id})
    if(data.length == 0)return res.status(200).send({message : "room id not exist"})
    return res.status(200).send({data : data})

  }catch(err){
    return res.status(500).send({message:err.message})
  }
}



exports.updateRoomBookingStatus = async (req,res)=>{
  try{
    const id = req.params.bookingId
    const{ status , userId} = req.body
    console.log(status)
    let data = await roomBookingModel.findOneAndUpdate({_id:id , user :userId},{status:status} ,{new: true})
    if(!data)return res.status(200).send({message : "bookingId id not exist"})
    return res.status(200).send({data : data})

  }catch(err){
    return res.status(500).send({message:err.message})
  }
}


