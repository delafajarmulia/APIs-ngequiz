import { body } from "express-validator";

export const questionValidator = [
    body('question', 'question is required')
        .notEmpty()
        .trim()
        .isLength({
            min: 3
        }).withMessage('question minimal 3 character'),
    body('quiz_id', 'Quiz id is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Quiz ID must be a numeric')
]