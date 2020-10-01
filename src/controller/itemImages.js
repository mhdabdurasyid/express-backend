const { addItemImageModel, getItemImageModel, updateItemImageModel, deleteItemImageModel, getItemImageByID } = require('../models/itemImages')
const upload = require('../helpers/upload')
const responseStandard = require('../helpers/responses')
const fs = require('fs')

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
  },
  getItemImage: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getItemImageModel(id, (error, result) => {
        if (!error) {
          if (result.length) {
            return responseStandard(response, 'Found an item image', { data: result })
          } else {
            return responseStandard(response, 'No item image found', { data: result }, 200, false)
          }
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  updateItemImage: (request, response) => {
    const uploadImage = upload.single('image')
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getItemImageByID(id, (err, res) => {
        if (!err) {
          if (res.length) {
            uploadImage(request, response, (error) => {
              if (error) {
                return responseStandard(response, error.message, {}, 400, false)
              } else {
                const image = request.file

                if (image) {
                  const pathImage = `/uploads/${image.filename}`

                  updateItemImageModel(pathImage, id, (error, result) => {
                    if (!error) {
                      if (result.affectedRows) {
                        fs.unlinkSync(`assets/${res[0].url}`)
                        return responseStandard(response, `Success update item image with ID ${id}!`, {})
                      } else {
                        return responseStandard(response, `Update failed! ID ${id} not found`, {}, 400, false)
                      }
                    } else {
                      return responseStandard(response, error.message, {}, 500, false)
                    }
                  })
                } else {
                  return responseStandard(response, 'All field must be fill', {}, 400, false)
                }
              }
            })
          } else {
            return responseStandard(response, 'No item image found', {}, 200, false)
          }
        } else {
          return responseStandard(response, err.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  deleteItemImage: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getItemImageByID(id, (err, res) => {
        if (!err) {
          if (res.length) {
            deleteItemImageModel(id, (error, result) => {
              if (!error) {
                if (result.affectedRows) {
                  fs.unlinkSync(`assets/${res[0].url}`)
                  return responseStandard(response, `Success delete item image with ID ${id}!`, {})
                } else {
                  return responseStandard(response, `Delete failed! ID ${id} not found`, {}, 400, false)
                }
              } else {
                return responseStandard(response, error.message, {}, 500, false)
              }
            })
          } else {
            return responseStandard(response, 'No item image found', {}, 200, false)
          }
        } else {
          return responseStandard(response, err.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  }
}
