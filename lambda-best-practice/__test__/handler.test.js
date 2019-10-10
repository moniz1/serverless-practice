describe("getUsers test suits", () => {
  
  const handler = require("../handler");

  it('test call status', async () => {
    const { statusCode, body } = await handler.getUsers();
    expect(statusCode).toBe(200);

    const { users } = JSON.parse(body);
    expect(Array.isArray(users)).toBeTruthy()
  });

  it('should test insertUser with have body data', async () => {
    const event = {
      body: '{"email": "test@abc.com", "firstname": "Test", "lastname": "Test"}'
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

  it('should test insertUser with have body data is not string', async () => {
    const event = {
      body: {}
    };
    await expect(handler.insertUser(event)).rejects.toThrow();
  });
})