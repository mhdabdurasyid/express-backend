const qs = require('querystring')
const { addCategoryModel, getCategoriesModel, updateCategoryModel, deleteCategoryModel, getDetailCategoryModel } = require('../models/categories')
const { getItemsByColumn, countItemsByColumn } = require('../models/items')
const upload = require('../helpers/upload')
const responseStandard = require('../helpers/responses')

module.exports = {
  addCategory: (request, response) => {
    const uploadImage = upload.single('image')

    uploadImage(request, response, (error) => {
      if (error) {
        return responseStandard(response, error.message, {}, 400, false)
      } else {
        const { name = '' } = request.body
        const image = request.file

        if (name.trim() && image) {
          const pathImage = `/uploads/${image.filename}`

          addCategoryModel(name, pathImage, (error, result) => {
            if (!error) {
              return responseStandard(response, 'Success add new category', {
                data: {
                  id: result.insertId,
                  ...request.body,
                  img_url: pathImage
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
  getCategories: (request, response) => {
    getCategoriesModel((error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'List of categories', { data: result })
        } else {
          return responseStandard(response, 'No data', {}, 200, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  },
  updateCategory: (request, response) => {
    const uploadImage = upload.single('image')
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      uploadImage(request, response, (error) => {
        if (error) {
          return responseStandard(response, error.message, {}, 400, false)
        } else {
          const image = request.file
          const { name = '' } = request.body

          if (name.trim() && image) {
            const pathImage = `/uploads/${image.filename}`

            updateCategoryModel(id, name, pathImage, (error, result) => {
              if (!error) {
                if (result.affectedRows) {
                  return responseStandard(response, `Success update category with ID ${id}!`, {})
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
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  deleteCategory: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteCategoryModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, `Success delete category with ID ${id}!`, {})
          } else {
            return responseStandard(response, `Delete failed! ID ${id} not found`, {}, 400, false)
          }
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
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
        return responseStandard(response, 'Page or limit must be a postive number', {}, 400, false)
      } else {
        getDetailCategoryModel(id, (error, result) => {
          if (!error) {
            if (result.length) {
              getItemsByColumn(searchKey, searchValue, page, limit, sortColumn, sortOption, 'category_id', result[0].id, (err, items) => {
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
                    countItemsByColumn(searchKey, searchValue, 'category_id', result[0].id, (data) => {
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

                      return responseStandard(response, 'Found a category', {
                        pageInfo,
                        data: {
                          category: result[0].name,
                          items: items
                        }
                      })
                    })
                  } else {
                    return responseStandard(response, 'No data on this page', {}, 400, false)
                  }
                } else {
                  return responseStandard(response, error.message, {}, 500, false)
                }
              })
            } else {
              return responseStandard(response, 'No data found', { data: result })
            }
          } else {
            return responseStandard(response, error.message, {}, 500, false)
          }
        })
      }
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  }
}
