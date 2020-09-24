const qs = require('querystring')
const { addSellerModel, getSellersModel, countSellersModel, updateSellerModel, updateSellerPartialModel, deleteSellerModel, getDetailSellerModel } = require('../models/sellers')
const { getItemsByColumn, countItemsByColumn } = require('../models/items')
const responseStandard = require('../helpers/responses')
// const bcrypt = require('bcryptjs')

module.exports = {
  addSeller: (request, response) => {
    const { email, password, storeName, phone, storeDescription } = request.body

    // const salt = bcrypt.genSaltSync(10)
    // const hashedPassword = bcrypt.hashSync(password, salt)
    // console.log(hashedPassword)

    if (email && password && storeName && phone && storeDescription) {
      addSellerModel(request.body, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success add new seller', {
            data: {
              id: result.insertId,
              ...request.body
            }
          })
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'All field must be fill', {}, 400, false)
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
      return responseStandard(response, 'Page or limit must be a poisitive number', {}, 400, false)
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

              return responseStandard(response, 'List of sellers', {
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
  updateSeller: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { email = '', password = '', storeName = '', phone = '', storeDescription = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (email.trim() && password.trim() && storeName.trim() && phone.trim() && storeDescription.trim()) {
        updateSellerModel(id, request.body, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              return responseStandard(response, `Success update seller with ID ${id}!`, {})
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
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
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
              return responseStandard(response, `Success update seller with ID ${id}!`, {})
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
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  deleteSeller: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteSellerModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, `Success delete seller with ID ${id}!`, {})
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
        return responseStandard(response, 'Page or limit must be a postive number', {}, 400, false)
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

                      return responseStandard(response, 'Found a seller', {
                        pageInfo,
                        data: {
                          seller: result,
                          items: items
                        }
                      })
                    })
                  } else {
                    return responseStandard(response, 'No data on this page', {
                      pageInfo,
                      data: {
                        seller: {},
                        items: {}
                      }
                    }, 200, false)
                  }
                } else {
                  return responseStandard(response, error.message, {}, 500, false)
                }
              })
            } else {
              return responseStandard(response, 'No data found', { data: result }, 200, false)
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
