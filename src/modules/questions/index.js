import express from 'express';
import QuestionController from './questionController';
import authenticate from '../../middlewares/authenticate';
import QuestionValidator from '../../middlewares/questionValidator';
import MeetupValidator from '../../middlewares/meetupValidator';

const questionRouter = express.Router();

questionRouter.post(
  '/meetups/:meetupId/questions',
  authenticate,
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionBody,
  QuestionController.createQuestion,
);
questionRouter.get(
  '/meetups/:meetupId/questions',
  MeetupValidator.checkMeetupExists,
  QuestionController.getAllQuestions,
);
questionRouter.get(
  '/meetups/:meetupId/questions/:questionId',
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  QuestionController.getQuestion,
);
questionRouter.patch(
  '/meetups/:meetupId/questions/:questionId',
  authenticate,
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  QuestionController.updateQuestion,
);
questionRouter.delete(
  '/meetups/:meetupId/questions/:questionId',
  authenticate,
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  QuestionController.deleteQuestion,
);

export default questionRouter;
