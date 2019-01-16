import mongoose from 'mongoose';
import Joi from 'joi';
import User from '../models/user.models';

class UserValidator {
  static async checkUserExists(req, res, next) {
    const { userId } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) return res.status(400).json({ error: 'Invalid User ID!' });

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ error: 'User not found!' });

    return next();
  }

  static async checkUniqueEmail(req, res, next) {
    const { email } = req.body;

    const user = User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User with given email already exists' });

    return next();
  }

  static async checkUserSignupBody(req, res, next) {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
    };

    Joi.validate(req.body, schema, (err) => {
      if (err) return res.status(400).json({ error: err.details[0].message });

      return next();
    });
  }

  static async checkUserSigninBody(req, res, next) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
    };

    Joi.validate(req.body, schema, (err) => {
      if (err) return res.status(400).json({ error: err.details[0].message });

      return next();
    });
  }
}

export default UserValidator;
