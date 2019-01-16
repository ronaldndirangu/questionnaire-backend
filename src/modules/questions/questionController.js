import mongoose from 'mongoose';
import Question from '../../models/question.models';
import Meetup from '../../models/meetup.models';

class QuestionController {
  static async createQuestion(req, res) {
    const { meetupId } = req.params;
    try {
      const meetup = await Meetup.findById({ _id: meetupId });
      const question = new Question({
        ...req.body,
        _id: mongoose.Types.ObjectId(),
      });
      meetup.questions.push(question);
      meetup.save();
      res.status(201).json({
        message: 'Question created successfully!',
        data: [question],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getQuestion(req, res) {
    const { questionId, meetupId } = req.params;
    try {
      const meetup = await Meetup.findById({ _id: meetupId });
      const question = meetup.questions.id(questionId);
      return res.status(200).json({
        message: 'Question retrieved successfully!',
        data: [question],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllQuestions(req, res) {
    const { meetupId } = req.params;
    try {
      const meetup = await Meetup.findById({ _id: meetupId });
      const { questions } = meetup;
      return res.status(200).json({
        message: 'Questions retrieved successfully!',
        data: [questions],
      });
    } catch (error) {
      throw error;
    }
  }


  static async updateQuestion(req, res) {
    const { questionId, meetupId } = req.params;
    const { title, body, createdBy } = req.body;
    try {
      const meetup = await Meetup.findById(meetupId);
      const question = meetup.questions.id(questionId);
      question.title = title;
      question.body = body;
      question.createdBy = createdBy;
      question.updatedAt = Date.now();
      meetup.save();

      return res.status(200).json({
        message: 'Question updated successfully!',
        data: [question],
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteQuestion(req, res) {
    const { questionId, meetupId } = req.params;
    try {
      const meetup = await Meetup.findById(meetupId);
      const question = meetup.questions.id(questionId);
      question.remove();
      meetup.save();
      return res.status(200).json({
        message: 'Question deleted successfully!',
        data: [meetup],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionController;
