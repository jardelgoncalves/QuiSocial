import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider!' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    req.userId = parseInt(decoded)
    
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid!' })    
  }
}