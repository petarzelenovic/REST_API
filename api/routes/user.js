const express = require("express");
const router = express.Router();
//restful api je stateless pa nema potrebe za log out jer ne pamtimo nikakvu sesiju


const userController = require("../controllers/user");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
