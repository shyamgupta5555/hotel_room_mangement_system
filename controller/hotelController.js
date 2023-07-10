
const mongoose =require("mongoose")
const hotelModel = require("../model/hotelModel")


exports.createHotel = async (req,res)=>{
  try{
    const data = req.body
    const {name , email ,password ,phone, dateOfOpening ,location } = data
   if(!name)return res.status(400).send({message :"name is required"})
   if(!email)return res.status(400).send({message :"email is required"})
   if(!password)return res.status(400).send({message :"password is required"})
   if(!location)return res.status(400).send({message :"location is required"})
   if(!dateOfOpening)return res.status(400).send({message :"dateOfOpening is required"})


   
    const uniqueEmail = await hotelModel.findOne({email :email})
    if (uniqueEmail)
      return res
        .status(400)
        .send({ message: "mail already exist another mail use" });

    const create = await hotelModel.create(data)
   return res.status(201).send(create);
   
  } catch (err) {
    if (err.isJoi == true) err.status = 400;
    return res.status(500).send({ message: err.message });
  }
}




