const AWS = require("aws-sdk");

class DbContext {
    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient({
            region: "us-east-1",
            endpoint: "dynamodb.us-east-1.amazonaws.com",
            accessKeyId: "AKIA5D77GMBQJELLFQNL", // needed if you don't have aws credentials at all in env
            secretAccessKey: "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" // needed if you don't have aws credentials at all in env
        });
    }

    async getAll(params) {
        return this.db.scan(params).promise();
    }

    async put(params) {
        return this.db.put(params).promise();
    }

    async putItem(params) {
        return this.db.update(params).promise();
    }
}

module.exports = {
    DbContext
};
