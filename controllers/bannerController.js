const Banner = require("../models/bannerModel");
const Errorhandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const { saveImages, removeFiles } = require("../utils/processImages");

// * CREATE
exports.addBanner = asyncHandler(async (req, res, next) => {
  const { roles } = req.userInfo;
  req.body.addedBy = req.userInfo.userId;
  if (roles === "seller" || roles.includes("seller")) {
    req.body.store = req.userInfo.storeId;
  } else {
    req.body.store = req.body.store;
  }
  let banner = await Banner.create(req.body);
  if (banner) {
    const path = `banners/${req.body.store}/${banner._id}`;
    const bannerImages = await saveImages(req.files, path);
    banner.images = bannerImages.map((image) => ({ url: image }));
    banner = await banner.save();
    res.status(201).json({ success: true, banner });
  }
});

exports.getBanners = asyncHandler(async (req, res, next) => {
  const banners = await Banner.find();
  res.status(200).json({ success: true, banners });
});

// * DELETE
exports.deleteBanner = asyncHandler(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) return next(new Errorhandler("Banner not found", 404));
  const path = `banners/${banner.store}/${banner._id}`;
  const remove = removeFiles(path);
  if (remove) {
    await banner.remove();
    res.status(200).json({ success: true, message: "banner deleted." });
  }
  return next(new Errorhandler("Not procceded.", 500));
});
