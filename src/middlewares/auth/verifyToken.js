// import config from '../config'
// import jwt from 'jsonwebtoken'
//
// module.exports = (request, response, next) => {
//   const token = request.headers.authorization;
//
//   jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
//     if (error) {
//       response.status(401).json({
//         message: 'You shall not pass!'
//       });
//     } else {
//       next();
//     }
//   });
// };
