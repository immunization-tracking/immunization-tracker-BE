require('dotenv').config();

if(process.env.NODE_ENV === "development"){
	require('nodemon')({script: './dev.js'})
	console.log('dev!!!!')
}else{
	require('./dist')
	console.log('production!!!!')
 }
