module.exports.sendMessage=((code=200,message='Welcome to localhost')=>{
    return {
        statusCode: code,
        body: JSON.stringify({
          message: message
        })
      };
})