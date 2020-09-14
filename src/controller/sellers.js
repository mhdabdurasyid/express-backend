const qs = require('querystring')
const { addSellerModel, getSellersModel, countSellersModel, updateSellerModel, updateSellerPartialModel, deleteSellerModel, getDetailSellerModel } = require('../models/sellers')
const { getItemsByColumn, countItemsByColumn } = require('../models/items')

module.exports = {
  addSeller: (request, response) => {
    const { email, password, storeName, phone, storeDescription } = request.body

    if (email && password && storeName && phone && storeDescription) {
      addSellerModel(request.body, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add seller',
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
  getSellers: (request, response) => {
    let { page, limit, search, sort } = request.query

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

    if (!search) {
      search = ''
    }

    if (!sort) {
      sort = 'asc'
    }

    if (Number.isNaN(page) || Number.isNaN(limit) || Math.sign(page) === -1 || Math.sign(limit) === -1 || Math.sign(page) === 0 || Math.sign(limit) === 0) {
      response.status(400).send({
        success: false,
        message: 'Page or limit must be a positive number'
      })
    } else {
      getSellersModel(page, limit, search, sort, (error, result) => {
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
            countSellersModel(search, (data) => {
              const { count } = data[0]
              pageInfo.count = count
              pageInfo.pages = Math.ceil(count / limit)

              const { pages, currentPage } = pageInfo

              if (currentPage < pages) {
                pageInfo.nextLink = `http://localhost:8080/seller?${qs.stringify({ ...request.query, ...{ page: page + 1 } })}`
              }

              if (currentPage > 1) {
                pageInfo.prevLink = `http://localhost:8080/seller?${qs.stringify({ ...request.query, ...{ page: page - 1 } })}`
              }

              response.send({
                success: true,
                message: 'List of sellers',
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
    }
  },
  updateSeller: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { email = '', password = '', storeName = '', phone = '', storeDescription = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (email.trim() && password.trim() && storeName.trim() && phone.trim() && storeDescription.trim()) {
        updateSellerModel(id, request.body, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              response.send({
                success: true,
                message: `Success update seller with ID ${id}!`
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
  updateSellerPartial: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { email = '', password = '', store_name = '', phone = '', store_description = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (email.trim() || password.trim() || store_name.trim() || phone.trim() || store_description.trim()) {
        const patchData = Object.entries(request.body).map(el => `${el[0]} = '${el[1].replace(/'/gi, "''")}'`).join(', ')

        updateSellerPartialModel(id, patchData, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              response.send({
                success: true,
                message: `Success update seller with ID ${id}!`
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
  deleteSeller: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteSellerModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            response.send({
              success: true,
              message: `Success delete seller with ID ${id}!`
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
  getDetailSeller: (request, response) => {
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
        getDetailSellerModel(id, (error, result) => {
          if (!error) {
            if (result.length) {
              getItemsByColumn(searchKey, searchValue, page, limit, sortColumn, sortOption, 'seller_id', result[0].id, (err, items) => {
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
                    countItemsByColumn(searchKey, searchValue, 'seller_id', result[0].id, (data) => {
                      const { count } = data[0]
                      pageInfo.count = count
                      pageInfo.pages = Math.ceil(count / limit)

                      const { pages, currentPage } = pageInfo

                      if (currentPage < pages) {
                        pageInfo.nextLink = `http://localhost:8080/seller/${id}?${qs.stringify({ ...request.query, ...{ page: page + 1 } })}`
                      }

                      if (currentPage > 1) {
                        pageInfo.prevLink = `http://localhost:8080/seller/${id}?${qs.stringify({ ...request.query, ...{ page: page - 1 } })}`
                      }

                      response.send({
                        success: true,
                        message: 'Found a seller',
                        pageInfo,
                        data: {
                          seller: result,
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
