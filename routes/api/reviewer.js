const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../../config/jwt");
const reviewer = require("../../models/reviewer");
/*
const uuid = require('uuid')
*/
const Admin = require("../../models/Admin");
const router = express.Router();
const validator = require("../../validations/reviewerValidations");

router.get("/", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
  });
  const reviewers = await reviewer.find();
  res.json({ data: reviewers });
});

router.get("/:id", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
  });
  const id = req.params.id;
  const reviewers = await reviewer.findById(id);
  res.send(reviewer);
});

router.put("/", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    const reviewers = await reviewer.findById(stat);
    if (!reviewers)
      return res.status(404).send({ error: "reviewer does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const updatedreviewer = await reviewer.findByIdAndUpdate(stat, req.body);
    res.json({ msg: "Reviewer updated successfully" });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    stat = decoded.id;
  });
  const admin = await Admin.findById(stat);
  if (!admin) {
    return res.status(400).send({ error: "You are not an admin" });
  }

  const {
    ssn,
    name,
    gender,
    address,
    phone,
    email,
    password,
    yearsOfExperience,
    age,
    birth,
    task
  } = req.body;
  const reviewers = await reviewer.findOne({ email });
  if (reviewers) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newReviewer = await reviewer.create(req.body);
  var token = jwt.sign({ id: newReviewer._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    token: token,
    msg: "Reviewer was created successfully",
    data: newReviewer
  });
  res.json({ msg: "Reviewer was created successfully", data: newReviewer });
});

router.delete("/", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    const deletedreviewer = await reviewer.findByIdAndRemove(stat);
    res.json({
      msg: "reviewer was deleted successfully",
      data: deletedreviewer
    });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    const admin = await Admin.find({_id : stat});
    console.log(admin);
    if (admin) {
      const id = req.params.id;
      const deletedreviewer = await reviewer.findByIdAndRemove(id);
      res.json({
        msg: "Lawyer deleted successfully",
      });
    }
    else
      return res.json({message: "You do not have the authorization."});
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});
module.exports = router;
