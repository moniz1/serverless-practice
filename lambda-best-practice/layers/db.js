const AWS = require('aws-sdk');

class DbContext {
  constructor() {
    console.log('------------', {
      region: process.env.DB_REGION, 
      endpoint: process.env.DB_ENDPOINT,
      accessKeyId: process.env.DB_ACCESS_KEY,  
      secretAccessKey: process.env.DB_SECET_KEY
    })
    this.db =  new AWS.DynamoDB.DocumentClient({
      region: process.env.DB_REGION, 
      endpoint: process.env.DB_ENDPOINT,
      accessKeyId: process.env.DB_ACCESS_KEY,  
      secretAccessKey: process.env.DB_SECET_KEY
    });
  }

  async getAll(params) {
    return this.db.scan(params).promise();
  }
  async updateUser(params) {
    return this.db.update(params).promise();
  }
  async put(params) {
    return this.db.put(params).promise();
  }
}

module.exports = {
  DbContext
}
