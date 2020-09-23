const multer = require('multer')

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'assets/uploads')
  },
  filename: (request, file, cb) => {
    const ext = file.originalname.split('.')
    const filename = new Date().getTime().toString()

    cb(null, `${filename}.${ext[ext.length - 1]}`)
  }
})

module.exports = multer({
  storage,
  fileFilter: function (request, file, cb) {
    let ext = file.originalname.split('.')
    ext = ext[ext.length - 1]

    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      return cb(new Error('Only images (.png, .jpg, .jpeg) are allowed'))
    }
    cb(null, true)
  },
  limits: { fileSize: 500000 }
})
