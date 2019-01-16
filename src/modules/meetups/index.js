import express from 'express';
import MeetupController from './meetupContoller';
import authenticate from '../../middlewares/authenticate';
import MeetupValidator from '../../middlewares/meetupValidator';

const MeetupRouter = express.Router();

MeetupRouter.get(
  '/meetups/:meetupId',
  MeetupValidator.checkMeetupExists,
  MeetupController.getMeetup,
);
MeetupRouter.post(
  '/meetups',
  authenticate,
  MeetupValidator.checkMeetupBody,
  MeetupController.createMeetup,
);
MeetupRouter.get(
  '/meetups',
  MeetupController.getAllMeetups,
);
MeetupRouter.patch(
  '/meetups/:meetupId',
  authenticate,
  MeetupValidator.checkMeetupExists,
  MeetupController.updateMeetup,
);
MeetupRouter.delete(
  '/meetups/:meetupId',
  authenticate,
  MeetupValidator.checkMeetupExists,
  MeetupController.deleteMeetup,
);

export default MeetupRouter;
