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

module.exports = {
  getUsers
}
