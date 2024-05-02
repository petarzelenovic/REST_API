const express = require("express");
const router = express.Router();
const checkRefresh = require("../middleware/check-refresh");
const tokenController = require("../controllers/token");

router.get("/refresh", checkRefresh, tokenController.refreshToken);

router.get("/revoke", checkRefresh, tokenController.revokeToken);

module.exports = router;