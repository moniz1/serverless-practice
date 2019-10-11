"use strict";
const { DbContext } = require("./layers/db");
const { sendError, isValidEmail } = require("./layers/common");

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

async function insertUser(event) {
  const dbCtxt = new DbContext();

  if (typeof event.body === 'undefined' || !event.body) throw new Error('Body params is empty in event');
  let bodyParams;
  try {
    bodyParams = JSON.parse(event.body);
    if (!isValidEmail(bodyParams.email)) {
      throw new Error('Email is invalid');
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
  } catch(error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
}


/**
 * createToDo()
 * @param {*} event 
 */
async function createToDo(event) {
  try {
    const dbCtxt = new DbContext();
    const body = JSON.parse(event.body);
    if (!body || !body.title || !isValidEmail(body.userEmail) || !Number.isInteger(body.status)) {
      throw new Error('Invalid input data.');
    }

    const item = {
      title: body.title,
      userEmail: body.userEmail,
      status: body.status,
      id: +new Date()
    };

    await dbCtxt.put({
      TableName: 'toDos',
      Item: item
    });

    return {
      statusCode: 200,
      body: JSON.stringify(item)
    };
  } catch (error) {
    return sendError(error.message);
  }
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
  createToDo,
  updateUser,
  getData
}
