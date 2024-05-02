const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const orderController = require("../controllers/orders");

router.get("/", checkAuth, orderController.getAll);

router.post("/", checkAuth, orderController.createOrder);

router.get("/:orderId", checkAuth, orderController.getById);

router.delete("/:orderId", checkAuth, orderController.deleteOrder);

module.exports = router;
