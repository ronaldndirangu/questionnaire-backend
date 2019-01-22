import mongoose from 'mongoose';
import Meetup from '../../models/meetup.models';

class MeetupController {
  static async createMeetup(req, res) {
    const { happeningOn } = req.body;
    try {
      const meetupModel = new Meetup({
        ...req.body,
        _id: mongoose.Types.ObjectId(),
        happeningOn,
      });
      const createdMeetup = await meetupModel.save();
      return res.status(201).json({
        message: 'Meetup created successfully!',
        data: [createdMeetup],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllMeetups(req, res) {
    Meetup.find({}, (err, docs) => {
      if (err) throw err;
      res.status(200).json({
        message: 'Meetups retrieved successfully!',
        data: docs,
      });
    });
  }

  static async getMeetup(req, res) {
    const { meetupId } = req.params;
    const meetup = await Meetup.findOne({ _id: meetupId });
    res.status(200).json({
      message: 'Meetup retrieved successfully!',
      data: [meetup],
    });
  }

  static async updateMeetup(req, res) {
    const { meetupId } = req.params;
    Meetup.findOneAndUpdate({ _id: meetupId },
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (err) throw err;
        res.status(200).json({
          message: 'Meetup updated successfully!',
          data: [doc],
        });
      });
  }

  static async deleteMeetup(req, res) {
    const { meetupId } = req.params;
    Meetup.findOneAndDelete({ _id: meetupId }, (err, doc) => {
      if (err) throw err;
      res.status(200).json({
        message: 'Meetup deleted successfully!',
        data: [doc],
      });
    });
  }
}

export default MeetupController;
