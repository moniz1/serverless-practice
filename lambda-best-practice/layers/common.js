
module.exports.sendError = (message = 'Error...', statusCode = 400) => {
  return {
    statusCode,
    body: JSON.stringify({
      message
    })
  };
}

module.exports.isValidEmail = (email) => {
  if (!email) return false;
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
