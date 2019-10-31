
const users = require("./models/users");
const todos = require("./models/todos");
const pauses = require("./models/pause-v2");

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
    },
    "pause-v2": {
      type: "array",
      minItems: 50,
      maxItems: 100,
      items: pauses
    }
  }
}