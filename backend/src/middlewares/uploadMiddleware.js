const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadPath = path.join(__dirname, "../uploads")

// create folder if not exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadPath)
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9)

    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    )
  },
})
console.log("uplad succes fully")
const upload = multer({ storage: storage })

module.exports = {
  upload,
}