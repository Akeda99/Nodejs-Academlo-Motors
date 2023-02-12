const User = require("../models/user.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validIfExistUser=catchAsync(async(req,res,next)=>{
    const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: 'available',
      id,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
})