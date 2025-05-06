import { body } from "express-validator";

export const questionValidator = [
  body('data')
    .isArray({ min: 1 }).withMessage('Data must be an array'),

  body('data.*.question')
    .notEmpty().withMessage('Question is required')
    .isLength({ min: 3 }).withMessage('Question must be at least 3 characters'),

  body('data.*.quiz_id')
    .notEmpty().withMessage('Quiz ID is required')
    .isNumeric().withMessage('Quiz ID must be numeric'),

  body('data.*.choices')
    .isArray({ min: 1 }).withMessage('Choices must be a non-empty array'),

  body('data.*.choices.*.choice')
    .notEmpty().withMessage('Choice text is required'),

  body('data.*.choices.*.is_correct')
    .isBoolean().withMessage('is_correct must be a boolean'),
];
