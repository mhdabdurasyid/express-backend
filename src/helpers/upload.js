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

module.exports = multer({ storage })
