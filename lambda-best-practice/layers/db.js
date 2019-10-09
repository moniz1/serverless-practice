const AWS = require('aws-sdk');

class DbContext {
  constructor() {
    this.db =  new AWS.DynamoDB.DocumentClient({
      region: 'us-east-1',
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      accessKeyId: 'AKIAVQE4ZQCSTRWZT3WC',  // needed if you don't have aws credentials at all in env
      secretAccessKey: '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' // needed if you don't have aws credentials at all in env
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
