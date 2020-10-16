require('dotenv').config()
const qs = require('querystring')
const { getDetailItemModel, addItemModel, updateItemModel, updatePartiallyItemModel, deleteItemModel, getItemsModel, countItemsModel } = require('../models/items')
const responseStandard = require('../helpers/responses')

module.exports = {
  getDetailItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getDetailItemModel(id, (error, result) => {
        if (!error) {
          if (result.length) {
            return responseStandard(response, 'Found an item', { data: result })
          } else {
            return responseStandard(response, 'No item found', { data: result }, 200, false)
          }
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
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
      searchKey = 'items.name'
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

    if (Number.isNaN(page) || Number.isNaN(limit) || Math.sign(page) === -1 || Math.sign(limit) === -1 || Math.sign(page) === 0 || Math.sign(limit) === 0) {
      return responseStandard(response, 'Page or limit must be a positive number', {}, 400, false)
    } else {
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
                pageInfo.nextLink = `${process.env.BASE_URL}/item?${qs.stringify({ ...request.query, ...{ page: page + 1 } })}`
              }

              if (currentPage > 1) {
                pageInfo.prevLink = `${process.env.BASE_URL}/item?${qs.stringify({ ...request.query, ...{ page: page - 1 } })}`
              }

              return responseStandard(response, 'List of items', {
                pageInfo,
                data: result
              })
            })
          } else {
            return responseStandard(response, 'No data on this page', {}, 400, false)
          }
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    }
  },
  addItem: (request, response) => {
    const { name, price, description, stock, categoryID, conditionID, colorID } = request.body

    if (name && price && description && stock && categoryID && conditionID && colorID) {
      if (request.body.stock > 0 && request.body.price > 0) {
        const data = {
          ...request.body,
          sellerID: request.user.id
        }

        addItemModel(data, (error, result) => {
          if (!error) {
            return responseStandard(response, 'Success add new item', {
              data: {
                id: result.insertId,
                ...data
              }
            })
          } else {
            return responseStandard(response, error.message, {}, 500, false)
          }
        })
      } else {
        return responseStandard(response, 'Price & stock must be a positive number', {}, 400, false)
      }
    } else {
      return responseStandard(response, 'All field must be fill', {}, 400, false)
    }
  },
  updateItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { name = '', price = '', description = '', stock = '', categoryID = '', conditionID = '', colorID = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (name.trim() && price.trim() && description.trim() && stock.trim() && categoryID.trim() && conditionID.trim() && colorID.trim()) {
        if (request.body.stock > 0 && request.body.price > 0) {
          updateItemModel(id, request.body, (error, result) => {
            if (!error) {
              if (result.affectedRows) {
                return responseStandard(response, `Success update item with ID ${id}!`, {})
              } else {
                return responseStandard(response, `Update failed! ID ${id} not found`, {}, 400, false)
              }
            } else {
              return responseStandard(response, error.message, {}, 500, false)
            }
          })
        } else {
          return responseStandard(response, 'Price & stock must be a positive number', {}, 400, false)
        }
      } else {
        return responseStandard(response, 'All field must be fill', {}, 400, false)
      }
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  updatePartiallyItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { name = '', price = '', description = '', stock = '', categoryID = '', conditionID = '', colorID = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (name.trim() || price.trim() || description.trim() || stock.trim() || categoryID.trim() || conditionID.trim() || colorID.trim()) {
        if (request.body.stock < 0 || request.body.price <= 0) {
          return responseStandard(response, 'Price & stock must be a positive number', {}, 400, false)
        } else {
          const patchData = Object.entries(request.body).map(el => Number(el[1]) ? `${el[0]} = ${el[1]}` : `${el[0]} = '${el[1].replace(/'/gi, "''")}'`).join(', ')

          updatePartiallyItemModel(id, patchData, (error, result) => {
            if (!error) {
              if (result.affectedRows) {
                return responseStandard(response, `Success update item with ID ${id}!`, {})
              } else {
                return responseStandard(response, `Update failed! ID ${id} not found`, {}, 400, false)
              }
            } else {
              return responseStandard(response, error.message, {}, 500, false)
            }
          })
        }
      } else {
        return responseStandard(response, 'All field must be fill', {}, 400, false)
      }
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  deleteItem: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteItemModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, 'Delete item success', {})
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
  }
}
