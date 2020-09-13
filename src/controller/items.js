const qs = require('querystring')
const { getDetailItemModel, addItemModel, updateItemModel, updatePartiallyItemModel, deleteItemModel, getItemsModel, countItemsModel } = require('../models/items')

module.exports = {
  getDetailItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getDetailItemModel(id, (error, result) => {
        if (!error) {
          if (result.length) {
            response.send({
              success: true,
              message: 'Found an item',
              data: result
            })
          } else {
            response.send({
              success: false,
              message: 'No item found',
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
    } else {
      response.status(400).send({
        success: false,
        message: 'Invalid or bad ID'
      })
    }
  },
  getItems: (request, response) => {
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
      limit = 5
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    getItemsModel(searchKey, searchValue, page, limit, sortColumn, sortOption, (error, result) => {
      if (!error) {
        const pageInfo = {
          count: 0,
          pages: 0,
          currentPage: page,
          limitPerPage: limit,
          nextLink: null,
          prevLink: null
        }

        if (result.length) {
          countItemsModel(searchKey, searchValue, (data) => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo

            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/item?${qs.stringify({ ...request.query, ...{ page: page + 1 } })}`
            }

            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/item?${qs.stringify({ ...request.query, ...{ page: page - 1 } })}`
            }

            response.send({
              success: true,
              message: 'List of items',
              pageInfo,
              data: result
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
  },
  addItem: (request, response) => {
    const { name, price, description, stock, categoryID, conditionID, colorID, sellerID } = request.body

    if (name && price && description && stock && categoryID && conditionID && colorID && sellerID) {
      if (price > 0 && stock >= 0 && Number.isInteger(price) && Number.isInteger(stock)) {
        addItemModel(request.body, (error, result) => {
          if (!error) {
            response.send({
              success: true,
              message: 'Success add item',
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
          message: 'Price & stock must be a positive integer'
        })
      }
    } else {
      response.status(400).send({
        success: false,
        message: 'Incomplete data on key & value'
      })
    }
  },
  updateItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { name = '', price = '', description = '', stock = '', categoryID = '', conditionID = '', colorID = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (name.trim() && price.trim() && description.trim() && stock.trim() && categoryID.trim() && conditionID.trim() && colorID.trim()) {
        if (price > 0 && stock >= 0 && Number.isInteger(price) && Number.isInteger(stock)) {
          updateItemModel(id, request.body, (error, result) => {
            if (!error) {
              if (result.affectedRows) {
                response.send({
                  success: true,
                  message: `Success update item with ID ${id}!`
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
            message: 'Price & stock must be a positive integer'
          })
        }
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
  updatePartiallyItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { name = '', price = '', description = '', stock = '', categoryID = '', conditionID = '', colorID = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (name.trim() || price.trim() || description.trim() || stock.trim() || categoryID.trim() || conditionID.trim() || colorID.trim()) {
        if (request.body.stock < 0 || request.body.price <= 0) {
          response.status(400).send({
            success: false,
            message: 'Price & stock must be a positive integer'
          })
        } else {
          const patchData = Object.entries(request.body).map(el => Number(el[1]) ? `${el[0]} = ${el[1]}` : `${el[0]} = '${el[1].replace(/'/gi, "''")}'`).join(', ')

          updatePartiallyItemModel(id, patchData, (error, result) => {
            if (!error) {
              if (result.affectedRows) {
                response.send({
                  success: true,
                  message: `Success update item with ID ${id}!`
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
        }
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
  deleteItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteItemModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            response.send({
              success: true,
              message: 'Delete item success!'
            })
          } else {
            response.status(400).send({
              success: false,
              message: 'Delete failed! ID not found'
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
  }
}
