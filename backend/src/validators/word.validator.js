import { body, validationResult, param } from 'express-validator';

export const validateAddWord = [
  body('japanese')
    .notEmpty().withMessage('Japanese is required')
    .isString().withMessage('Japanese must be a string'),
  body('korean')
    .notEmpty().withMessage('Korean is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
];