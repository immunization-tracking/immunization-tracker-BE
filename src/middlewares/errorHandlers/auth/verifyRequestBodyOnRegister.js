module.exports = (request, response, next) => {
  if (request.body.username &&
      request.body.password &&
      request.body.email){
      // request.body.birthday &&
      // request.body.ss_id) {
      next();
  } else {
    response.status(400).json({
      message: 'Please provide a username, password and email!'
    });
  }
};
