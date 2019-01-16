import mongoose from 'mongoose';

const { Schema } = mongoose;

export const CommentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  body: { type: String, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const schema = mongoose.model('Comment', CommentSchema);

export default schema;
