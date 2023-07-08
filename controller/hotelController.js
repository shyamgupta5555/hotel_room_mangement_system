const hotelModel = require("../model/hotelModel")


exports.createHotel = async (req,res)=>{
  try{
    const data = req.body
    const {name , email ,password , dateOfOpening ,location } = data
    const logo = req.files[0];
    const uniqueEmail = await user.findOne({ email: email });
    if (uniqueEmail)
      return res
        .status(400)
        .send({ message: "mail already exist another mail use" });
    const uniquePhone = await user.findOne({ phone: phone });
    if (uniquePhone)
      return res
        .status(400)
        .send({ message: "phone already exist another mail use" });

    if (!logo)
      return res.status(400).send({ message: "please insert profile image!" });
    if (!validFile(logo.originalname))
      return res
        .status(400)
        .send({ message: "please select valid  logo like jpeg , png ,jpg" });

    let uploadedFileURL = await uploadFile(req.files[0]);
    data.logo = uploadedFileURL;

    const create = hotelModel.create(data)
   return res.status(201).send(create);
   
  } catch (err) {
    if (err.isJoi == true) err.status = 400;
    return res.status(500).send({ message: err.message });
  }
}




