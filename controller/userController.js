const user = require("../model/userModel");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { loginSchema, userSchema } = require("../validation/validation");

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const { firstName, lastName, email, phone, password, dateOfBirth, gender } =
      data;
    let obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password
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
    const check = await user.findOne({ email: email });
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

