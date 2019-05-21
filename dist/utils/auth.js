'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.login = exports.register = exports.verifyToken = exports.newToken = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bcrypt = require('bcryptjs');

const newToken = exports.newToken = (user, tbl) => {
  return _jsonwebtoken2.default.sign({ id: user.id, tbl }, _config2.default.secrets.jwt, {
    expiresIn: _config2.default.secrets.jwtExp
  });
};

const verifyToken = exports.verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken2.default.verify(token, _config2.default.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

function getRoleTable(req) {
  return req.query.role.toString() === "1" ? 'patients' : 'staffs';
}

const register = exports.register = async (req, res) => {
  const role = getRoleTable(req);
  const hash = bcrypt.hashSync(req.body.password, 8);
  const user = await (0, _db2.default)(role).insert(_extends({}, req.body, { password: hash }));
  return res.status(201).json(user);
};

const login = exports.login = async (req, res) => {
  const tbl = getRoleTable(req);

  // Does the user exist
  const { username, password } = req.body;
  const userFound = await (0, _db2.default)(tbl).where({ username: username }).first();

  // Does the password match
  const hashMatched = await bcrypt.compare(password, userFound.password);
  if (userFound && hashMatched) {
    const token = newToken(userFound, tbl);
    return res.status(200).json({
      userId: userFound.id,
      token
    });
  } else {
    return res.status(401).json({ message: "You do not have the correct credential" });
  }
};

const protect = exports.protect = async (req, res, next) => {
  const token = req.headers.authorization;
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).json({ message: e });
  }
  //
  const tbl = payload.tbl;
  const user = await (0, _db2.default)(tbl).where({ id: payload.id });

  if (!user) {
    return res.status(401).json({ message: e });
  }

  req.user = user;
  next();
};