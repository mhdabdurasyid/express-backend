// const qs = require('querystring')
const { addCategoryModel, getCategoriesModel } = require('../models/categories')

module.exports = {
  addCategory: (request, response) => {
    const { name } = request.body

    if (name) {
      addCategoryModel(name, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add category',
            data: {
              id: result.insertId,
              ...request.body
            }
          })
        } else {
          response.status(500).send({
            success: false,
            message: error.message
          })
        }
      })
    } else {
      response.status(400).send({
        success: false,
        message: 'Incomplete data on key & value'
      })
    }
  },
  getCategories: (request, response) => {
    getCategoriesModel((error, result) => {
      if (!error) {
        if (result.length) {
          response.send({
            success: true,
            message: 'List of categories',
            data: result
          })
        } else {
          response.status(400).send({
            success: false,
            message: 'No data on categories'
          })
        }
      } else {
        response.status(500).send({
          success: false,
          message: error.message
        })
      }
    })
  }
}
