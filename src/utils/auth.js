import db from './db'
import config from '../config'
import jwt from 'jsonwebtoken'
const bcrypt = require('bcryptjs');

export const newToken = (user, tbl) => {
  return jwt.sign({ id: user.id , tbl}, config.secrets.jwt, {
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
  const user = await db(role).insert({...req.body, password:hash}, 'id')
  return res.status(201).json(user)
}

export const login = async (req, res) => {
  const tbl = getRoleTable(req)
  
  // Does the user exist
  const {username, password} = req.body
  const userFound = await db(tbl).where({ username: username}).first()
  
  // Does the password match
  const hashMatched = await bcrypt.compare(password, userFound.password)
  
  if (userFound && hashMatched) {
     const token = newToken(userFound, tbl)
     const patient =  {
         message: "Registration successful",
         patient_id: userFound.id,
         username,
         token
      }
     const staff =  {
          message: "Registration successful",
          staff_id: userFound.id,
          username,
         token
      }
      return res.status(200).json(tbl === 'staffs' ? staff : patient)
  }else{
      return res.status(401).json({message:"You do not have the correct credential"})
  }
}

export const protect = async (req, res, next) => {
  const token = req.headers.authorization
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).json({message: 'You are not verified' })
  }
  //
  const tbl = payload.tbl
  const user = await db(tbl).where({id:payload.id})

  if (!user) {
    return res.status(401).json({message:e})
  }

  req.user = user
  next()
}
