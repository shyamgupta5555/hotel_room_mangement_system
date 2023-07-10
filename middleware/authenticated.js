const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.auth1 = async (req, res,next) => {
  try {
    let header = req.headers["authorization"];
    if (!header)
      return res.status(400).send({ message: "jwt must be provided" });
    jwt.verify(header, "hotelApplication", (err, decode) => {
      if (err)
       return res.status(401).send({ status: false, message: err.message });
      req.id = decode.id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.auth2 = async (req, res,next) => {
  try {
    let user = req.body.user;
    if(!user)return res.status(400).send({message :"user required"})
    if(user)
    if (user != req.id)
      return res
        .status(400)
        .send({ status: false, message: "user id not valid" });
    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
