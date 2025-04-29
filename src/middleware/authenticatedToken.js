import { response } from '../utils/response.js'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export const authenticatedToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    if(!authHeader){
        return response(401, [], 'Unathorized user, token require', res)
    }

    const token = authHeader && authHeader.split(' ')[1]

    jwt.verify(token, jwtSecret, (err, user) => {
        if(err) return response(401, [], 'forbiden. invalid or expired token', res)

        req.user = user
        next()
    })
}