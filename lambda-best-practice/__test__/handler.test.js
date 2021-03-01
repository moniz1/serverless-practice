const toDay = new Date();

describe("getUsers test suits", () => {
  
  const handler = require("../handler");

  it('test call status', async () => {
    const { statusCode, body } = await handler.getUsers();
    expect(statusCode).toBe(200);

    const { users } = JSON.parse(body);
    expect(Array.isArray(users)).toBeTruthy()
  });

  it('should test insertUser with have body data', async () => {
    const email = `test${toDay.getTime()}`;
    const event = {
      body: `{"email": "${email}@abc.com", "firstname": "Test", "lastname": "Test"}`
    };
    const { statusCode, body } = await handler.insertUser(event);
    expect(statusCode).toBe(200);

    const { user } = JSON.parse(body);
    expect(user).not.toBeNull();
  });

  it('should test insertUser with have body data is null', async () => {
    const event = {
      body: undefined
    };
    await expect(handler.insertUser(event)).rejects.toThrow();
  });

  it('should test insertUser with email invalid', async () => {
    const event = {
      body: '{"email": "test@abc" }'
    };
    const { statusCode, body } = await handler.insertUser(event);
    expect(statusCode).toBe(400);
    expect(body.error).not.toBeNull();
  });

  it('should throw an error if the body data is empty', async () => {
    const { statusCode, body } = await handler.createToDo();

    expect(statusCode).toBe(400);
    expect(body.message).not.toBeNull();
  });

  it('should throw an error if the status type is string', async () => {
    const params = {
      body: JSON.stringify({
        status: "1",
        title: "Hello, new todo 12345",
        userEmail: "phudev95@gmail.com"
      })
    };
    const { statusCode, body } = await handler.createToDo(params);
    const res = JSON.parse(body);
    
    expect(statusCode).toBe(400);
    expect(res.message).toMatch('Invalid input data.');
  });

  it('should throw an error if the title is empty', async () => {
    const params = {
      body: JSON.stringify({
        status: 1,
        userEmail: "phudev95@gmail.com"
      })
    };
    const { statusCode, body } = await handler.createToDo(params);
    const res = JSON.parse(body);
    
    expect(statusCode).toBe(400);
    expect(res.message).toMatch('Invalid input data.');
  });

  it('should throw an error if the userEmail is empty', async () => {
    const params = {
      body: JSON.stringify({
        status: 1,
        title: "New todo..."
      })
    };
    const { statusCode, body } = await handler.createToDo(params);
    const res = JSON.parse(body);
    
    expect(statusCode).toBe(400);
    expect(res.message).toMatch('Invalid input data.');
  });

  it('should throw an error if the userEmail is invalid', async () => {
    const params = {
      body: JSON.stringify({
        status: 1,
        title: "New todo...",
        userEmail: "phudev95gmail"
      })
    };
    const { statusCode, body } = await handler.createToDo(params);
    const res = JSON.parse(body);
    
    expect(statusCode).toBe(400);
    expect(res.message).toMatch('Invalid input data.');
  });

  it('should create a todo successfully', async () => {
    const params = {
      body: JSON.stringify({
        status: 1,
        title: "New todo...",
        userEmail: "phudev95@gmail.com"
      })
    };
    const { statusCode, body } = await handler.createToDo(params);
    const res = JSON.parse(body);

    expect(statusCode).toBe(200);
    expect(res.id).toBeGreaterThanOrEqual(0);
    expect(res).toMatchObject(JSON.parse(params.body));
  });
})

describe("Update User test",()=>{
  const handler = require("../handler");

  it('should update user with data',async()=>{
    const event={
      body:'{ "email": "test@abc.com","firstname": "ab","lastname": "c"}',
      pathParameters:{
        email:"test@abc.com"
      }
    }
    const {statusCode, body} = await handler.updateUser(event)
    expect(statusCode).toBe(200)
    expect(JSON.parse(body).message).toEqual(`update successfully for email ${event.pathParameters.email}`)
  })

  it('should body is not be empty ',async()=>{
    const event = {
      body:'',
      pathParameters:{
        email:"test@abc.com"
      }
    }
    const {statusCode, body} = await handler.updateUser(event)
    console.log(`MTTEST---${statusCode}${body}`)
    expect(statusCode).toBe(500)
    expect(JSON.parse(body).message).toEqual(`body cannot be empty`)
  })

  it('should body is not param invalid',async()=>{
    const event = {
      body:{},
      pathParameters:{
        email:"test@abc.com"
      }
    }
    const {statusCode, body} = await handler.updateUser(event)
    expect(statusCode).toBe(500)
    expect(JSON.parse(body).message).toEqual(`body params is invalid`)
  })

  it('should email is not modified',async()=>{
    const event = {
      body:'{ "email": "test1@abc.com","firstname": "ab","lastname": "c"}',
      pathParameters:{
        email:"test@abc.com"
      }
    }
    const {statusCode, body} = await handler.updateUser(event)
    expect(statusCode).toBe(400)
    expect(JSON.parse(body).message).toEqual(`email is cannot be modified`)
  })

  it('should fistname & lastname is not empty',async()=>{
    const event = {
      body:'{ "email": "test@abc.com"}',
      pathParameters:{
        email:"test@abc.com"
      }
    }
    const {statusCode, body} = await handler.updateUser(event)
    expect(statusCode).toBe(500)
    expect(JSON.parse(body).message).toEqual(`firstname & lastname must not be empty`)
  })
})