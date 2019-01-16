import Joi from 'joi';
import mongoose from 'mongoose';
import Meetup from '../models/meetup.models';


class MeetupValidator {
  static async checkMeetupExists(req, res, next) {
    const { meetupId } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(meetupId);
    if (!isValid) return res.status(400).json({ error: 'Invalid Meetup ID!' });
    const meetup = await Meetup.findOne({ _id: meetupId });
    if (!meetup) return res.status(404).json({ error: 'Meetup not found!' });
    return next();
  }

  static async checkMeetupBody(req, res, next) {
    const schema = {
      topic: Joi.string().required(),
      happeningOn: Joi.date().required(),
      images: Joi.array(),
      tags: Joi.array(),
    };
    Joi.validate(req.body, schema, (err) => {
      if (err) return res.status(400).json({ error: err.details[0].message });
      return next();
    });
  }
}

export default MeetupValidator;
