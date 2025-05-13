const multer = require("multer");
const { uid } = require("../utils/uid");

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, process.env.FILE_PATH);
  },
  filename: function (request, file, cb) {
    cb(null, uid() + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("img_src");

function uploadFile(request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    } else {
      next();
    }
  });
}

module.exports = uploadFile;
