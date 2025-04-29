import express from 'express'
import { registerValidation } from './user.validation.js'
import { validationResult } from 'express-validator'
import { response } from '../../utils/response.js'
import { getUserByEmail, register } from './user.repository.js'
import bcrypt from 'bcrypt'

export const router = express.Router()

router.post('/register', registerValidation, async (req, res) => {
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
        const newUser = await register(passwordHashing, user)
       
        return response(200, newUser, 'Successfully add new user', res);
    } catch (error) {
        console.log(error);
        return response(500, null, 'Internal server error', res);
    }
});
