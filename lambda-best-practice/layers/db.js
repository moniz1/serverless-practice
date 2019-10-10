const AWS = require('aws-sdk');

class DbContext {
  constructor() {
    this.db =  new AWS.DynamoDB.DocumentClient({
      region: process.env.REGION,
      endpoint: process.env.ENDPOINT,
      accessKeyId: process.env.ACCESS_KEY,  // needed if you don't have aws credentials at all in env
      secretAccessKey: process.env.SECRET_ACCESS_KEY // needed if you don't have aws credentials at all in env
    });
  }

  async getAll(params) {
    return this.db.scan(params).promise();
  }

  async put(params) {
    return this.db.put(params).promise();
  }
}

module.exports = {
  DbContext
}
