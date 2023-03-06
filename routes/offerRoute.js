const express = require("express");
const {
  addOffer,
  getOffers,
  deleteOffer,
} = require("../controllers/offerController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router
  .route("/offers")
  .post(isAuthenticated, authorizeRoles("admin"), addOffer)
  .get(getOffers);

router
  .route("/offers/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOffer);

module.exports = router;
