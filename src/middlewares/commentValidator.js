import mongoose from 'mongoose';
import Joi from 'joi';
import Meetup from '../models/meetup.models';

class CommentValidator {
  static async checkCommentExists(req, res, next) {
    const { questionId, meetupId, commentId } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(commentId);

    if (!isValid) return res.status(400).json({ error: 'Invalid Comment ID!' });

    const meetup = await Meetup.findOne({ _id: meetupId });
    const question = meetup.questions.id(questionId);
    const comment = question.comments.id(commentId);

    if (!comment) return res.status(404).json({ error: 'Comment not found!' });

    return next();
  }

  static async checkCommentBody(req, res, next) {
    const schema = {
      body: Joi.string().required(),
    };

    Joi.validate(req.body, schema, (err) => {
      if (err) return res.status(400).json({ error: err.details[0].message });
      return next();
    });
  }
}

export default CommentValidator;
