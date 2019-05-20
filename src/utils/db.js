import knex from 'knex'
import knexConfig from '../../knexfile.js'

const dbEnv = process.env.node_env || 'development';

module.exports = knex(knexConfig[dbEnv]);


