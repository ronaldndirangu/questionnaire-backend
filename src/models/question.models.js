import mongoose from 'mongoose';
import { CommentSchema } from './comment.models';

const { Schema } = mongoose;

export const QuestionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  createdOn: { type: Date, default: Date.now() },
  createdBy: { type: String, required: true, max: 100 },
  title: { type: String, required: true, max: 100 },
  body: { type: String, required: true, max: 100 },
  comments: [CommentSchema],
  votes: { type: Number, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const schema = mongoose.model('Question', QuestionSchema);

export default schema;
