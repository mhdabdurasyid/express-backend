const { getCitiesModel } = require('../models/cities')
const responseStandard = require('../helpers/responses')

module.exports = {
  getCities: (request, response) => {
    getCitiesModel((error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'List of cities', { data: result })
        } else {
          return responseStandard(response, 'No data found', {}, 400, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  }
}
