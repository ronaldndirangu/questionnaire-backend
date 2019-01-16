import mongoose from 'mongoose';
import Comment from '../../models/comment.models';
import Meetup from '../../models/meetup.models';

class CommentsController {
  static async createComment(req, res) {
    const { body } = req.body;
    const { questionId, meetupId } = req.params;
    try {
      const meetup = await Meetup.findById(meetupId);
      const question = meetup.questions.id(questionId);
      const comment = new Comment({
        _id: mongoose.Types.ObjectId(),
        body,
      });

      question.comments.push(comment);
      meetup.save();

      res.status(201).json({
        message: 'Comment created successfully!',
        data: [comment],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllComments(req, res) {
    const { questionId, meetupId } = req.params;
    try {
      const meetup = await Meetup.findById(meetupId);
      const question = meetup.questions.id(questionId);
      const { comments } = question;
      res.status(200).json({
        message: 'Comments retrieved successfully!',
        data: [comments],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getComment(req, res) {
    const { questionId, meetupId, commentId } = req.params;
    try {
      const meetup = await Meetup.findById(meetupId);
      const question = meetup.questions.id(questionId);
      const comment = question.comments.id(commentId);
      res.status(200).json({
        message: 'Comment retrieved successfully!',
        data: [comment],
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateComment(req, res) {
    const { questionId, meetupId, commentId } = req.params;
    try {
      const meetup = await Meetup.findById(meetupId);
      const question = meetup.questions.id(questionId);
      const comment = question.comments.id(commentId);
      comment.body = req.body.body;
      comment.updatedAt = Date.now();
      meetup.save();

      res.status(200).json({
        message: 'Comment updated successfully!',
        data: [comment],
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(req, res) {
    const { questionId, meetupId, commentId } = req.params;
    try {
      const meetup = await Meetup.findById(meetupId);
      const question = meetup.questions.id(questionId);
      const comment = question.comments.id(commentId);
      comment.remove();
      meetup.save();

      res.status(200).json({
        message: 'Comment deleted successfully!',
        data: [question],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default CommentsController;
