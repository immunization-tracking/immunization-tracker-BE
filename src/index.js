require('dotenv').config();

import startServer from './start'

startServer( process.env.PORT || 3000)
