import { body } from "express-validator";

export const choiceValidator = [
    body('choice', 'Choice is required')
        .notEmpty()
        .trim()
        .isLength({
            min: 3
        }).withMessage('Choice minimal 3 character'),
    body('is_correct', 'is_correct is required')
        .notEmpty()
        .trim()
        .isBoolean().withMessage('is_correct must be a boolean'),
    body('question_id', 'Question id is required')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Question ID must be a numeric')
]