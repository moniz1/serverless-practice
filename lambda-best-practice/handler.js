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

module.exports = {
  getUsers,
  insertUser
}
