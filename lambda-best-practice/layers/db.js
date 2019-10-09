const AWS = require('aws-sdk');

class DbContext {
  constructor() {
    this.db =  new AWS.DynamoDB.DocumentClient({
      region: 'http://192.168.72.118',
      endpoint: 'http://192.168.72.118:8000',
      accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
      secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    });
  }

  async getAll(params) {
    return this.db.scan(params).promise();
  }
  async updateUser(params) {
    return this.db.update(params,function (err, data) {
      if (err) {
        // console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
    }).promise();
  }
}

module.exports = {
  DbContext
}
