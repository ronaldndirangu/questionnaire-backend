import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const schema = mongoose.model('User', UserSchema);

export default schema;
