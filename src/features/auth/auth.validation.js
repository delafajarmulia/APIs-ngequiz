import { body } from 'express-validator'

export const registerValidation = [
    body('name', 'Name is required')
        .trim()
        .notEmpty()
        .isLength({
            min: 3
        }).withMessage('Name at least 3 character'),
    body('email', 'Email is required')
        .notEmpty()
        .trim()
        .isEmail().withMessage('Please input valid Email'),
    body('password', 'Password is required')
        .notEmpty()
        .trim()
        .isLength({
            min: 8
        }).withMessage('Password minimal 8 charachter'),
]

export const loginValidation = [
    body('email', 'Email is required')
        .notEmpty()
        .trim()
        .isEmail().withMessage('Please input valid Email'),
    body('password', 'Password is required')
        .notEmpty()
        .trim()
        .isLength({
            min: 8
        }).withMessage('Password minimal 8 charachter'),
]

export const loginGoogleValidation = [
    body('email', 'Email is required')
        .notEmpty()
        .trim()
        .isEmail().withMessage('Please input valid Email'),
]