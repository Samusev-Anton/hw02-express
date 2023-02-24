const jimp = require("jimp");

const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const jimpImg = async (tempUpload) => {
  const prepareImg = await jimp.read(tempUpload);
  await prepareImg
    .autocrop()
    .cover(100, 100, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload);
  return tempUpload;
};
module.exports = jimpImg;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloud = (tempUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      tempUpload,
      {
        folder: "avatars",
        transformation: {
          width: 100,
          crop: "fill",
        },
      },
      (error, result) => {
        console.log(result);
        if (error) reject(error);
        if (result) resolve(result);
      }
    );
  });
};
