module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      minimum: 1,
      autoIncrement: true
    },
    title: {
      faker: 'commerce.productName'
    },
    userEmail: {
      "jsonPath": "$.users[*].email"
    },
    status: {
      enum: [0, 1, 2]
    }
  }
}