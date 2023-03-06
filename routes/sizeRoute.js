const express = require("express");
const {
  addSize,
  getSizes,
  getSizeDetails,
  updateSize,
  deleteSize,
} = require("../controllers/sizeController");

const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router
  .route("/sizes")
  .post(isAuthenticated, authorizeRoles("admin"), addSize)
  .get(getSizes);

router
  .route("/sizes/:id")
  .get(getSizeDetails)
  .put(isAuthenticated, authorizeRoles("admin"), updateSize)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteSize);

module.exports = router;
