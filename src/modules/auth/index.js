import express from 'express';
import AuthController from './auth.controller';
import UserValidator from '../../middlewares/userValidator';

const authRouter = express.Router();

authRouter.post(
  '/auth/signup',
  UserValidator.checkUserSignupBody,
  AuthController.signUpUser,
);
authRouter.post(
  '/auth/signin',
  UserValidator.checkUserSigninBody,
  AuthController.signInUser,
);

export default authRouter;
