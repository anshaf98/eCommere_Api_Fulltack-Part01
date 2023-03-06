const Size = require("../models/sizeModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// * CREATE
exports.addSize = asyncHandler(async (req, res, next) => {
  req.body.addedBy = req.userInfo.userId;
  const size = await Size.create(req.body);
  res.status(201).json({ success: true, size });
});

// * GET ALL
exports.getSizes = asyncHandler(async (req, res, next) => {
  const sizes = await Size.find();
  res.status(200).json({ success: true, sizes });
});

// * GET SINGLE
exports.getSizeDetails = asyncHandler(async (req, res, next) => {
  const size = await Size.findById(req.params.id);
  if (!size) return next(new ErrorHandler("Size not found.", 404));
  res.status(200).json({ success: true, size });
});

// * UPDATE
exports.updateSize = asyncHandler(async (req, res, next) => {
  req.body.updatedBy = req.userInfo.userId;
  let size = await Size.findById(req.params.id);
  if (!size) return next(new ErrorHandler("Size not found.", 404));
  size = await Size.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({ success: true, size });
});

// * DELETE
exports.deleteSize = asyncHandler(async (req, res, next) => {
  let size = await Size.findById(req.params.id);
  if (!size) return next(new ErrorHandler("Size not found.", 404));
  const active = await Product.findOne({ size: req.params.id });
  if (active)
    return next(new ErrorHandler("Size is used.Could not deleted.", 406));
  await size.remove();
  res.status(200).json({ success: true });
});
