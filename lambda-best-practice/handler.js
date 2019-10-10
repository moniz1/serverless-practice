"use strict";
const { DbContext } = require("./layers/db");

async function getUsers() {
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
async function insertUser(event) {
  const dbCtxt = new DbContext();

  if (typeof event.body === 'undefined' || !event.body) throw new Error('Body params is empty in event');
  let bodyParams;
  try {
    bodyParams = JSON.parse(event.body);
  } catch(e) {
    throw new Error('Body params is invalid');
  }

  await dbCtxt.put({
    TableName: "users",
    Item: {
      email: bodyParams.email,
      firstname: bodyParams.firstname,
      lastname: bodyParams.lastname
    },
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      user: bodyParams
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
  insertUser,
  updateUsers,
  getData
}
