const qs = require('querystring')
const { addSellerModel, getSellersModel, countSellersModel } = require('../models/sellers')

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
}
