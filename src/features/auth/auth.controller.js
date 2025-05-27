import { validationResult } from 'express-validator'
import { response } from '../../utils/response.js'
import { getUserByEmail, createNewUser, createNewUserByGoogle } from './auth.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export const register = async (req, res) => {
    try {
        const user = req.body;

        // ✅ HARUS pakai req, bukan user
        const isErrorValidation = validationResult(req);
        if (!isErrorValidation.isEmpty()) {
            return response(422, isErrorValidation.array(), 'Validation error', res);
        }

        const userAvailabled = await getUserByEmail(user.email)
        if(userAvailabled){
            return response(400, [], 'User already exist', res)
        }

        const passwordHashing = await bcrypt.hash(user.password, 10)
        const newUser = await createNewUser(passwordHashing, user)
       
        return response(200, newUser, 'Successfully add new user', res);
    } catch (error) {
        console.log(error);
        return response(500, null, 'Internal server error', res);
    }
}

export const login = async(req, res) => {
    try {
        const user = req.body
        const pw = user.password

        const isErrorValidation = validationResult(req)
        if(!isErrorValidation.isEmpty()){
            return response(422, isErrorValidation.array(), 'Validation error', res)
        }

        const userAvailabled = await getUserByEmail(user.email)
        if(!userAvailabled){
            return response(404, [], 'User does not exist', res)
        }

        const passwordCheck = await bcrypt.compare(pw, userAvailabled.password)
        if(!passwordCheck){
            return response(401, [], 'Invalid password', res)
        }

        const payload = {
            id: userAvailabled.id,
            email: userAvailabled.email,
            role: userAvailabled.role
        }

        const token = jwt.sign(payload, jwtSecret, {expiresIn: "1h"})

        return response(200, token, 'Successfully login', res)
    } catch (error) {
        res.send(error)
    }
}

export const loginGoogle = async(req, res) => {
    try {
        const email = req.body.email

        const isErrorValidation = validationResult(req)
        if(!isErrorValidation.isEmpty()){
            return response(422, isErrorValidation.array(), 'Validation error', res)
        }

        const userAvailabled = await getUserByEmail(email)
        if(!userAvailabled){
            const regist = await registWithGoogle(req, res)
        }

        const payload = {
            id: userAvailabled.id,
            email: userAvailabled.email,
            role: userAvailabled.role
        }

        const token = jwt.sign(payload, jwtSecret, {expiresIn: "1h"})

        return response(200, token, 'Successfully login', res)
    } catch (error) {
        res.send(error)
    }
}

export const registWithGoogle = async(req, res) => {
    try {
        const user = req.body;

        // ✅ HARUS pakai req, bukan user
        const isErrorValidation = validationResult(req);
        if (!isErrorValidation.isEmpty()) {
            return response(422, isErrorValidation.array(), 'Validation error', res);
        }

        const userAvailabled = await getUserByEmail(user.email)
        if(userAvailabled){
            const login = await loginGoogle(req, res)
        }

        // const passwordHashing = await bcrypt.hash(user.password, 10)
        const newUser = await createNewUserByGoogle( user)

        if(newUser){
            const login = await loginGoogle(req, res)
        }
       
        // return response(200, newUser, 'Successfully add new user', res);
    } catch (error) {
        res.send(error)
    }
}