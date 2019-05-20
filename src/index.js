require('dotenv').config();

import startServer from './start'
//
// const notTest = process.env.NODE_ENV !== 'test'
// const isProduction = process.env.NODE_ENV !== 'production'
// const logLevel = process.env.LOG_LEVEL || (notTest ? 'info' : 'warn')


startServer( process.env.PORT || 3000)
