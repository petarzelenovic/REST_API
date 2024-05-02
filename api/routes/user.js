const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//restful api je stateless pa nema potrebe za log out jer ne pamtimo nikakvu sesiju
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = require("../controllers/user");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
