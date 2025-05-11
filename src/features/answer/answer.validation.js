import { body } from "express-validator";

export const submitAnswerValidation = [
    body('question_id')
        .notEmpty().withMessage('Question id is required')
        .isNumeric().withMessage('Question id must be a number'),
    body('choice_id')
        .notEmpty().withMessage('Choice id is required')
        .isNumeric().withMessage('Choice id must be a number')
]