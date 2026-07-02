import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  role: 'system' | 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface IInterview extends Document {
  user: mongoose.Types.ObjectId;
  resume?: mongoose.Types.ObjectId;
  jobRole: string;
  company: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'HR' | 'Technical' | 'Behavioral';
  status: 'Pending' | 'In Progress' | 'Completed';
  messages: IMessage[];
  feedback?: {
    overallScore: number;
    communicationScore: number;
    technicalScore: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

const messageSchema = new Schema({
  role: { type: String, enum: ['system', 'user', 'ai'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const interviewSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
    jobRole: { type: String, required: true },
    company: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    type: { type: String, enum: ['HR', 'Technical', 'Behavioral'], default: 'Technical' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    messages: [messageSchema],
    feedback: {
      overallScore: Number,
      communicationScore: Number,
      technicalScore: Number,
      strengths: [String],
      weaknesses: [String],
      suggestions: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInterview>('Interview', interviewSchema);
