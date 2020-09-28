const { addItemImageModel } = require('../models/itemImages')
const upload = require('../helpers/upload')
const responseStandard = require('../helpers/responses')

module.exports = {
  addItemImage: (request, response) => {
    const uploadImage = upload.single('image')

    uploadImage(request, response, (error) => {
      if (error) {
        return responseStandard(response, error.message, {}, 400, false)
      } else {
        const { id } = request.body
        const image = request.file

        if (id && image) {
          const pathImage = `/uploads/${image.filename}`

          addItemImageModel(pathImage, id, (error, result) => {
            if (!error) {
              return responseStandard(response, 'Success add item image', {
                data: {
                  id: result.insertId,
                  img_url: pathImage,
                  item_id: id
                }
              })
            } else {
              return responseStandard(response, error.message, {}, 500, false)
            }
          })
        } else {
          return responseStandard(response, 'All field must be fill', {}, 400, false)
        }
      }
    })
  }
}
