import mongoose from 'mongoose';
import { QuestionSchema } from './question.models';

const { Schema } = mongoose;

const MeetupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  images: { type: Array, required: true },
  topic: { type: String, required: true },
  questions: [QuestionSchema],
  happeningOn: { type: Date, required: true },
  tags: { type: Array, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const schema = mongoose.model('Meetup', MeetupSchema);

export default schema;
