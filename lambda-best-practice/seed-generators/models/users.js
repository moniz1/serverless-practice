module.exports = {
  type: 'object',
  properties: {
    email: {
      faker: 'internet.email'
    },
    firstname: {
      faker: 'name.firstName'
    },
    lastname: {
      faker: 'name.lastName'
    }

  }
}