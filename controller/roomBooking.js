const roomBookingModel= require("../model/roomBookingModel")
const hotelModel = require("../model/hotelModel")
const userModel = require("../model/userModel")



exports.createRoomBooking = async (req,res)=>{
  try{
    const data = req.body
    const {user, hotel, requestedDate} = data
    const hotelId = await hotelModel.findOne({ _id : hotel });
    if (!hotelId)return res.status(400).send({ message: "hotel id not present our database" });
    const userId = await userModel.findOne({ _id : user });
    if (!userId)return res.status(400).send({ message: "user id not present our database" });

    const create = roomBookingModel.create(data)
   return res.status(201).send(create);

  } catch (err) {
    
    return res.status(500).send({ message: err.message });
  }
}


exports.getRoomBookingRequest = async (req,res)=>{
  try{
    const id = req.params.userId
    let data = await roomBookingModel.findOne({user :userId})
    if(data.length == 0)return res.status(200).send({message : "user not any request"})
    return res.status(200).send({data : data})
  }catch(err){
    return res.status(500).send({ message: err.message });

  }
}

exports.getRoomBookingStatus = async (req,res)=>{
  try{
    const id = req.params.roomId
    let data = await roomBookingModel.findById({_id:id})
    if(data.length == 0)return res.status(200).send({message : "room id not exist"})
    return res.status(200).send({data : data})

  }catch(err){
    return res.status(500).send({message:err.message})
  }
}


exports.updateRoomBookingStatus = async (req,res)=>{
  try{
    const id = req.params.roomId
    const status = req.body.status

    let data = await roomBookingModel.findByIdAndUpdate({_id:id},{status:status} ,{new: true})
    if(!data)return res.status(200).send({message : "room id not exist"})
    return res.status(200).send({data : data})

  }catch(err){
    return res.status(500).send({message:err.message})
  }
}
