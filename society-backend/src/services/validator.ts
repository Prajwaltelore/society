import { Request, Response, NextFunction } from "express";
import { check, validationResult } from 'express-validator';

export const signupValidation = [
    check('firstname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter firstname')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in firstname')
      .bail(),
    check('lastname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter lastname')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in lastname')
      .bail(),
    check('mobile')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isMobilePhone('en-IN')
      .withMessage('Please enter valid mobile number')
      .bail()
      .isLength({min: 10, max: 10})
      .withMessage('Please enter valid mobile number')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Please enter valid email address')
      .bail(),
    check('password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter password')
      .bail(),
    check('confirm_password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter password')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.send({status: false, message: 'Validation', errors: errors.array()});
      next();
    },
  ];

  export const loginValidation = [
    check('mobile')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isMobilePhone('en-IN')
      .withMessage('Please enter mobile')
      .bail()
      .isLength({min: 10, max: 10})
      .withMessage('Please enter valid mobile number')
      .bail(),
    check('password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter password')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.send({status: false, message: 'Validation', errors: errors.array()});
      next();
    },
  ];

  export const userUpdateValidation = [
    check('firstname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter firstname')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in firstname')
      .bail(),
    check('lastname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter lastname')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in lastname')
      .bail(),
    check('mobile')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter mobile')
      .isMobilePhone('en-IN')
      .withMessage('Please enter mobile')
      .bail()
      .isLength({min: 10, max: 10})
      .withMessage('Please enter valid mobile number')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Please enter valid email address')
      .bail(),
    check('dob')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isDate({format: 'YYYY-MM-DD'})
      .withMessage('Please enter DOB')
      .bail(),
    check('country')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please select country')
      .isInt()
      .withMessage('Please select country')
      .bail(),
    check('state')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please select state')
      .isInt()
      .withMessage('Please select state')
      .bail(),
    check('city')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please select city')
      .isInt()
      .withMessage('Please select city')
      .bail(),
    check('occupation')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter occupation')
      .bail(),
    check('emergency_contact')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isMobilePhone('en-IN')
      .withMessage('Please enter valid emergency contact')
      .bail()
      .isLength({min: 10, max: 10})
      .withMessage('Please enter valid emergency contact')
      .bail(),
    check('current_address')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter current address')
      .bail(),
    check('permanent_address')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter permanent address')
      .bail(),
    check('gender')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty().isIn(['male', 'female', 'other']),
    check('password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter password')
      .bail(),
    check('confirm_password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter password')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.send({status: false, message: 'Validation', errors: errors.array()});
      next();
    },
  ];

  export const createSocietyValidation = [
    check('project')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter project name')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in project name')
      .bail(),
    check('society')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter society name')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in society name')
      .bail(),
    check('country')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please select country')
      .isInt()
      .withMessage('Please select country')
      .bail(),
    check('state')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please select state')
      .isInt()
      .withMessage('Please select state')
      .bail(),
    check('city')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please select city')
      .isInt()
      .withMessage('Please select city')
      .bail(),
    check('address')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter society address')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in society address')
      .bail(),
    check('flats')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter no. of flats')
      .isInt()
      .withMessage('Please enter no. of flats')
      .bail(),
    check('formation_date')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter society formation date')
      .isDate({format: 'YYYY-MM-DD'})
      .withMessage('Please enter society formation date')
      .bail(),
    check('user')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isInt()
      .withMessage('Please provide user id')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.send({status: false, message: 'Validation', errors: errors.array()});
      next();
    },
  ];

  export const docValidation = [
    check('society_id')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isInt()
      .withMessage('Please enter society id')
      .bail(),
    check('doc_number')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter document number')
      .bail(),
    // check('file')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please upload file')
    //   .bail(),
    check('doc_type')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Please enter document type')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.send({status: false, message: 'Validation', errors: errors.array()});
      next();
    },
  ];