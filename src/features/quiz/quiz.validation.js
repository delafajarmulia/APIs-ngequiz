import { body } from "express-validator";

export const quizValidator = [
    body('title', 'title is required')
        .trim()
        .notEmpty()
        .isLength({
            min: 3
        }).withMessage('Title minimal 3 character'),
    body('is_once', 'is_once field is required')
        .isBoolean().withMessage('is_once must be boolean value')
]