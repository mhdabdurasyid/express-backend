const qs = require('querystring')
const { addCategoryModel, getCategoriesModel, updateCategoryModel, deleteCategoryModel, getDetailCategoryModel } = require('../models/categories')
const { getItemsByCategory, countItemsByCategory } = require('../models/items')

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
  },
  updateCategory: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { name = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (name.trim()) {
        updateCategoryModel(id, name, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              response.send({
                success: true,
                message: `Success update category with ID ${id}!`
              })
            } else {
              response.status(400).send({
                success: false,
                message: `Update failed! ID ${id} not found`
              })
            }
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
          message: 'Update failed! Incomplete key & value'
        })
      }
    } else {
      response.status(400).send({
        success: false,
        message: 'Invalid or bad ID'
      })
    }
  },
  deleteCategory: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteCategoryModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            response.send({
              success: true,
              message: `Success delete category with ID ${id}!`
            })
          } else {
            response.status(400).send({
              success: false,
              message: `Delete failed! ID ${id} not found`
            })
          }
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
        message: 'Invalid or bad ID'
      })
    }
  },
  getDetailCategory: (request, response) => {
    let { id } = request.params
    id = Number(id)

    let { page, limit, search, sort } = request.query

    let searchKey = ''
    let searchValue = ''
    let sortColumn = ''
    let sortOption = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }

    if (typeof sort === 'object') {
      sortColumn = Object.keys(sort)[0]
      sortOption = Object.values(sort)[0]
    } else {
      sortColumn = 'created_at'
      sortOption = sort || ''
    }

    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    if (typeof id === 'number' && !isNaN(id)) {
      if (Number.isNaN(page) || Number.isNaN(limit) || Math.sign(page) === -1 || Math.sign(limit) === -1 || Math.sign(page) === 0 || Math.sign(limit) === 0) {
        response.status(400).send({
          success: false,
          message: 'Page or limit must be a postive number'
        })
      } else {
        getDetailCategoryModel(id, (error, result) => {
          if (!error) {
            if (result.length) {
              getItemsByCategory(searchKey, searchValue, page, limit, sortColumn, sortOption, result[0].id, (err, items) => {
                if (!err) {
                  const pageInfo = {
                    count: 0,
                    pages: 0,
                    currentPage: page,
                    limitPerPage: limit,
                    nextLink: null,
                    prevLink: null
                  }

                  if (items.length) {
                    countItemsByCategory(searchKey, searchValue, result[0].id, (data) => {
                      const { count } = data[0]
                      pageInfo.count = count
                      pageInfo.pages = Math.ceil(count / limit)

                      const { pages, currentPage } = pageInfo

                      if (currentPage < pages) {
                        pageInfo.nextLink = `http://localhost:8080/category/${id}?${qs.stringify({ ...request.query, ...{ page: page + 1 } })}`
                      }

                      if (currentPage > 1) {
                        pageInfo.prevLink = `http://localhost:8080/category/${id}?${qs.stringify({ ...request.query, ...{ page: page - 1 } })}`
                      }

                      response.send({
                        success: true,
                        message: 'Found a category',
                        pageInfo,
                        data: {
                          category: result,
                          items: items
                        }
                      })
                    })
                  } else {
                    response.status(400).send({
                      success: false,
                      message: 'No data on this page'
                    })
                  }
                } else {
                  response.status(500).send({
                    success: false,
                    message: error.message
                  })
                }
              })
            } else {
              response.send({
                success: false,
                message: 'No data found',
                data: result
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
    } else {
      response.status(400).send({
        success: false,
        message: 'Invalid or bad ID'
      })
    }
  }
}
