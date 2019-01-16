import Joi from 'joi';
import mongoose from 'mongoose';
import Meetup from '../models/meetup.models';


class QuestionValidator {
  static async checkQuestionExists(req, res, next) {
    const { questionId, meetupId } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(questionId);

    if (!isValid) return res.status(400).json({ error: 'Invalid Question ID!' });

    const meetup = await Meetup.findOne({ _id: meetupId });
    const question = meetup.questions.id(questionId);

    if (!question) return res.status(404).json({ error: 'Question not found!' });

    return next();
  }

  static async checkQuestionBody(req, res, next) {
    const schema = {
      createdBy: Joi.string().required(),
      title: Joi.string().required(),
      body: Joi.string().required(),
      votes: Joi.number().required(),
    };

    Joi.validate(req.body, schema, (err) => {
      if (err) res.status(400).json({ error: err.details[0].message });
      return next();
    });
  }
}

export default QuestionValidator;
