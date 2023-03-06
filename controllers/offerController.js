const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const Offer = require("../models/offerModel");

// * CREATE
exports.addOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.create(req.body);
  res.status(201).json({ success: true, offer });
});

exports.getOffers = asyncHandler(async (req, res, next) => {
  const categories = await Offer.find();
  res.status(200).json({ success: true, categories });
});

exports.deleteOffer = asyncHandler(async (req, res, next) => {
  let offer = await Offer.findById(req.params.id);
  if (!offer) return next(new ErrorHandler("Offer not found.", 404));
  const active = await Product.findOne({ offer: req.params.id });
  if (active)
    return next(new ErrorHandler("Offer is used.Could not deleted.", 406));
  await offer.remove();
  res.status(200).json({ success: true });
});
