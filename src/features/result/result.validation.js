import { body } from "express-validator";

export const resultValidator = [
    body('quiz_id')
        .notEmpty().withMessage('Quiz id is required')
        .isNumeric().withMessage('Quiz id must be a number')
]