const { getProvincesModel } = require('../models/provinces')
const responseStandard = require('../helpers/responses')

module.exports = {
  getProvinces: (request, response) => {
    getProvincesModel((error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'List of provinces', { data: result })
        } else {
          return responseStandard(response, 'No data found', {}, 400, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  }
}
