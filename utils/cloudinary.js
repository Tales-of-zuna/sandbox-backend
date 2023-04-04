const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dwl0svlrm",
  api_key: "765167474423461",
  api_secret: "TPOCjGkD1VtyUEkiZr0ZlVwjS80",
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.UploadStream.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
        },
        { resource_type: "auto" }
      );
    });
  });
};
