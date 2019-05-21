'use strict';

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _knexfile = require('../../knexfile.js');

var _knexfile2 = _interopRequireDefault(_knexfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dbEnv = process.env.node_env || 'development';

module.exports = (0, _knex2.default)(_knexfile2.default[dbEnv]);