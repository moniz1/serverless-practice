"use strict";
const { DbContext } = require("./layers/db");
const { sendError, isValidEmail } = require("./layers/common");

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

    if (typeof event.body === "undefined" || !event.body)
        throw new Error("Body params is empty in event");
    let bodyParams;
    try {
        bodyParams = JSON.parse(event.body);
        if (!isValidEmail(bodyParams.email)) {
            throw new Error("Email is invalid");
        }

        await dbCtxt.put({
            TableName: "users",
            Item: {
                email: bodyParams.email,
                firstname: bodyParams.firstname,
                lastname: bodyParams.lastname
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify({
                user: bodyParams
            })
        };
    } catch (error) {
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
        if (
            !body ||
            !body.title ||
            !isValidEmail(body.userEmail) ||
            !Number.isInteger(body.status)
        ) {
            throw new Error("Invalid input data.");
        }

        const item = {
            title: body.title,
            userEmail: body.userEmail,
            status: body.status,
            id: +new Date()
        };

        await dbCtxt.put({
            TableName: "toDos",
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

async function updateTodos(event) {
    const dbCtxt = new DbContext();
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    if (
        !body ||
        !body.title ||
        !body.userEmail ||
        !Number.isInteger(body.status)
    ) {
        throw new Error("Invalid input data.");
    }

    const params = {
        TableName: "toDos",
        Key: {
            id: parseInt(id)
        },
        UpdateExpression: "set #t = :t, #email=:u, #st= :s",
        ExpressionAttributeValues: {
            ":t": body.title,
            ":u": body.userEmail,
            ":s": 0
        },
        ExpressionAttributeNames: {
            "#t": "title",
            "#email": "userEmail",
            "#st": "status"
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        await dbCtxt.putItem(params);
    } catch (err) {
        return sendError(err.message);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    };
}

module.exports = {
    getUsers,
    insertUser,
    createToDo,
    updateTodos
};
