import mongoose, { Document, Schema } from 'mongoose';

export interface IUpcomingInterview extends Document {
  user: mongoose.Types.ObjectId;
  role: string;
  company: string;
  date: Date;
}

const upcomingInterviewSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    role: { type: String, required: true },
    company: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUpcomingInterview>('UpcomingInterview', upcomingInterviewSchema);
