const express = require("express");
const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const {
  addBanner,
  getBanners,
  deleteBanner,
} = require("../controllers/bannerController");

const router = express.Router();

router
  .route("/banners")
  .post(
    isAuthenticated,
    authorizeRoles("admin", "seller"),
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter([".png", ".jpg", ".jpeg"]),
    fileSizeLimiter,
    addBanner
  )
  .get(getBanners);

router
  .route("/banners/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteBanner);

// router.route("/products").get(getBanner);

module.exports = router;
