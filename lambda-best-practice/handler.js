"use strict";
const { DbContext } = require("./layers/db");
const {sendMessage} = require("./utils/sendMessage")

const moment = require('moment')

async function getUsers() {
  const dbCtxt = new DbContext();
  const { Items } = await dbCtxt.getAll({ TableName: "users" });
  return {
    statusCode: 200,
    body: JSON.stringify({
      users: Items,
      message: `Today is ${moment().format('DD/MMM/YYYY')}`
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
async function updateUser(event) {
  const dbCtxt = new DbContext();
  const Table = "users"
  let userEmail = event.pathParameters.email;
  
  if(!isNaN(event.body)){
    return sendMessage(500,'body cannot be empty')
  }
  let body={}
  try{
    body = JSON.parse(event.body);
  }catch(err){
    return sendMessage(500,'body params is invalid')
  }
  
  if(body.email && body.email != userEmail){
    return sendMessage(400,'email is cannot be modified')
  }
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
  try{
    await dbCtxt.updateUser(params)
    return sendMessage(200,`update successfully for email ${userEmail}`)
  }catch(err){
    return sendMessage(500,`firstname & lastname must not be empty`)
  }
}

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  getData
}
