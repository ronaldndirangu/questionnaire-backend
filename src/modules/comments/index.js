import express from 'express';
import CommentsController from './commentController';
import authenticate from '../../middlewares/authenticate';
import CommentValidator from '../../middlewares/commentValidator';
import MeetupValidator from '../../middlewares/meetupValidator';
import QuestionValidator from '../../middlewares/questionValidator';

const commentRouter = express.Router();

commentRouter.post(
  '/meetups/:meetupId/questions/:questionId/comments',
  authenticate,
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  CommentValidator.checkCommentBody,
  CommentsController.createComment,
);
commentRouter.get(
  '/meetups/:meetupId/questions/:questionId/comments',
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  CommentsController.getAllComments,
);
commentRouter.get(
  '/meetups/:meetupId/questions/:questionId/comments/:commentId',
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  CommentValidator.checkCommentExists,
  CommentsController.getComment,
);
commentRouter.patch(
  '/meetups/:meetupId/questions/:questionId/comments/:commentId',
  authenticate,
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  CommentValidator.checkCommentExists,
  CommentValidator.checkCommentBody,
  CommentsController.updateComment,
);
commentRouter.delete(
  '/meetups/:meetupId/questions/:questionId/comments/:commentId',
  authenticate,
  MeetupValidator.checkMeetupExists,
  QuestionValidator.checkQuestionExists,
  CommentValidator.checkCommentExists,
  CommentsController.deleteComment,
);

export default commentRouter;
