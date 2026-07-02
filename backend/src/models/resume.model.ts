import mongoose, { Document, Schema } from 'mongoose';

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  fileUrl: string;
  originalName: string;
  parsedData?: {
    skills: string[];
    experience: string[];
    education: string[];
  };
  aiFeedback?: {
    score: number;
    missingSkills: string[];
    grammarSuggestions: string[];
    atsCompatibility: number;
    improvementSuggestions: string[];
  };
}

const resumeSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    parsedData: {
      skills: [String],
      experience: [String],
      education: [String],
    },
    aiFeedback: {
      score: { type: Number, default: 0 },
      missingSkills: [String],
      grammarSuggestions: [String],
      atsCompatibility: { type: Number, default: 0 },
      improvementSuggestions: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IResume>('Resume', resumeSchema);
