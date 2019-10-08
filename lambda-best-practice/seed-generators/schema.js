
const users = require("./models/users");
const todos = require("./models/todos");

module.exports = {
  type: "object",
  properties: {
    users: {
      type: "array",
      minItems: 50,
      maxItems: 100,
      items: users,
      uniqueItems: true
    },
    todos: {
      type: "array",
      minItems: 50,
      maxItems: 100,
      items: todos
    }
  }
}