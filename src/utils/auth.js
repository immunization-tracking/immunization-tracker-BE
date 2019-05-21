import db from './db'
import config from '../config'
import jwt from 'jsonwebtoken'
const bcrypt = require('bcryptjs');

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

function getRoleTable(req){
  return req.query.role.toString() === "1"  ? 'patients' : 'staffs'
}

export const register = async (req, res) => {
  const role = getRoleTable(req)
  const hash = bcrypt.hashSync(req.body.password, 8)
  const user = await db(role).insert({...req.body, password:hash})
  return res.status(201).json(user)
}

export const login = async (req, res) => {
  const role = getRoleTable(req)
  
  // Does the user exist
  const {username, password} = req.body
  const userFound = await db(role).where({ username: username}).first()
  
  // Does the password match
  const hashMatched = await bcrypt.compare(password, userFound.password)
  if (userFound && hashMatched) {
     const token = newToken(userFound)
     return res.status(200).json(
     {
        userId: userFound.id,
        username: userFound.username,
        token
      })
  }else{
      return res.status(401).json({message:"You do not have the correct credential"})
  }
}


export const protect = async (req, res, next) => {
  // const bearer = req.headers.authorization
  //
  // if (!bearer || !bearer.startsWith('Bearer ')) {
  //   return res.status(401).end()
  // }
  //
  // const token = bearer.split('Bearer ')[1].trim()
  // let payload
  // try {
  //   payload = await verifyToken(token)
  // } catch (e) {
  //   return res.status(401).end()
  // }
  //
  // const user = await User.findById(payload.id)
  //   .select('-password')
  //   .lean()
  //   .exec()
  //
  // if (!user) {
  //   return res.status(401).end()
  // }
  //
  // req.user = user
  // next()
}
