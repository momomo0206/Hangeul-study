import { body, validationResult } from 'express-validator';

export const validateTranslate = [
  body('text')
    .notEmpty().withMessage('Enter the Japanese text to translate')
    .isString().withMessage('Text must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
];