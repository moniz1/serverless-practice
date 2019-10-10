const AWS = require('aws-sdk');

class DbContext {
  constructor() {
    this.db =  new AWS.DynamoDB.DocumentClient({
      region: process.env.DB_REGION,
      endpoint: process.env.DB_ENDPOINT,
      accessKeyId: process.env.DB_ACCESS_KEY_ID, // needed if you don't have aws credentials at all in env
      secretAccessKey: process.env.DB_SECRET_ACCESS_KEY // needed if you don't have aws credentials at all in env
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
