import { body } from "express-validator";

export const choiceValidator = [
    body('data')
        .isArray({
            min: 1
        }).withMessage('Data must be an array'),
    body('data.*.choice', 'Choice is required')
        .notEmpty()
        .trim()
        .isLength({
            min: 3
        }).withMessage('Choice minimal 3 character'),
    body('data.*.is_correct', 'is_correct is required')
        .notEmpty()
        .trim()
        .isBoolean().withMessage('is_correct must be a boolean'),
    body('data.*.question_id', 'Question id is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Question ID must be a numeric')
]