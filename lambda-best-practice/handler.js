"use strict";
const { DbContext } = require("./layers/db");

async function getUsers(event) {
  const dbCtxt = new DbContext();

  const { Items } = await dbCtxt.getAll({ TableName: "users" });
  return {
    statusCode: 200,
    body: JSON.stringify({
      users: Items
    })
  };
}

async function getData(event) {
  const dbCtxt = new DbContext();
  let table = event.pathParameters.table;
  const { Items } = await dbCtxt.getAll({ TableName: table });
  return {
    statusCode: 200,
    body: JSON.stringify({
      users: Items
    })
  };
}

async function updateUsers(event) {
  const dbCtxt = new DbContext();
  const Table = "users"
  let userEmail = event.pathParameters.email;
  let body = JSON.parse(event.body);

  let params = {
    TableName: Table,
    Key: {
      email: userEmail
    },
    UpdateExpression: "set firstname = :f, lastname=:l",
    ExpressionAttributeValues: {
      ':f': body.firstname,
      ':l': body.lastname
    },
    ReturnValues: "UPDATED_NEW"
  }
  await dbCtxt.updateUser(params)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:`update successfully for email ${userEmail}`
    })
  };
}

module.exports = {
  getUsers,
  updateUsers,
  getData
};