const user = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { uploadFile } = require("../aws/fileUpload");
const { loginSchema, userSchema } = require("../validation/validation");

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const { firstName, lastName, email, phone, password, dateOfBirth, gender } =
      data;
    const profileImage = req.files[0];
    let obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      dateOfBirth: dateOfBirth,
    };
    await userSchema.validateAsync(obj);

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

    if (!profileImage)
      return res.status(400).send({ message: "please insert profile image!" });
    if (!validFile(profileImage.originalname))
      return res
        .status(400)
        .send({ message: "please select valid  image like jpeg , png ,jpg" });

    let uploadedFileURL = await uploadFile(req.files[0]);
    data.profileImage = uploadedFileURL;

    const hash = await bcrypt.hash(password, 10);
    data.password = hash;

    const create = await user.create(data);
    return res.status(201).send({ data: create });
  } catch (err) {
    if (err.isJoi == true) err.status = 400;
    return res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    await loginSchema.validateAsync(data);
    const check = await userModel.findOne({ email: email });
    if (!check) return res.status(404).send({ message: "This mail wrong" });

    const matchPassword = await bcrypt.compare(password, check.password);
    if (!matchPassword)
      return res.status(400).send({ message: "password is wrong" });

    const token = jwt.sign(
      { id: check._id, name: check.firstName + check.lastName },
      "hotelApplication",
      { expiresIn: "1h" }
    );
    const obj = { id: check.id, token: token, expireToken: "1h" };
    return res.status(200).send(obj);
  } catch (err) {
    if (err.isJoi == true) err.status = 400;
    return res.status(500).send({ message: err.message });
  }
};

