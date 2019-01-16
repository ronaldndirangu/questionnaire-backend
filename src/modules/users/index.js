import express from 'express';
import UserController from './user.controller';
import authenticate from '../../middlewares/authenticate';
import UserValidator from '../../middlewares/userValidator';

const userRouter = express.Router();

userRouter.get(
  '/users',
  UserController.getAllUsers,
);
userRouter.get(
  '/users/:userId',
  UserValidator.checkUserExists,
  UserController.getUser,
);
userRouter.patch(
  '/users/:userId',
  authenticate,
  UserValidator.checkUserExists,
  UserController.updateUser,
);
userRouter.delete(
  '/users/:userId',
  authenticate,
  UserValidator.checkUserExists,
  UserController.deleteUser,
);

export default userRouter;
