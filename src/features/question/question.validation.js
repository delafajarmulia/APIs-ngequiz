import { body } from "express-validator";

export const questionValidator = [
    body('data')
        .isArray({
            min: 1
        }).withMessage('Data must be an array'),
    body('data.*.question', 'question is required')
        .notEmpty()
        .trim()
        .isLength({
            min: 3
        }).withMessage('question minimal 3 character'),
    body('data.*.quiz_id', 'Quiz id is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Quiz ID must be a numeric')
]