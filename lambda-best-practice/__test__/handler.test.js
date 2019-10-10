process.env.REGION = 'us-east-1';
process.env.ACCESS_KEY = 'AKIA4JNW5R2NU2C6NEZT';
process.env.SECRET_ACCESS_KEY = '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';

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
})