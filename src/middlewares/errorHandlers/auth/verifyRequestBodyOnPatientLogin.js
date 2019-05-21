module.exports = (request, response, next) => {
  if (request.body.username && request.body.password) {
    next();
  } else {
    response.status(400).json({
      message: 'Please provide a username, password!'
    });
  }
};
