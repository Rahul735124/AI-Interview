import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import Resume from '../models/resume.model.js';
import cloudinary from '../config/cloudinary.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
import { analyzeResumeContent } from '../services/ai.service.js';

// @desc    Upload and parse a new resume
// @route   POST /api/resumes/upload
// @access  Private
export const uploadResume = async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a resume file (PDF)');
  }

  try {
    // 1. Upload file to Cloudinary
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'ai-interview/resumes', resource_type: 'image', format: 'pdf' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(req.file?.buffer);
    });

    const fileUrl = (cloudinaryResult as any).secure_url;

    // 2. Extract text from PDF buffer
    let resumeText = '';
    if (req.file.mimetype === 'application/pdf') {
      const parser = new PDFParse({ data: new Uint8Array(req.file.buffer) });
      const textResult = await parser.getText();
      resumeText = textResult.text;
    } else {
      res.status(400);
      throw new Error('Only PDF format is supported currently');
    }

    // 3. Analyze with Gemini AI
    const aiAnalysis = await analyzeResumeContent(resumeText);

    // 4. Save to Database
    const resume = await Resume.create({
      user: req.user._id,
      fileUrl,
      originalName: req.file.originalname,
      parsedData: aiAnalysis.parsedData,
      aiFeedback: aiAnalysis.aiFeedback,
    });

    res.status(201).json(resume);
  } catch (error: any) {
    console.error('Resume Processing Error:', error);
    res.status(500);
    throw new Error('Failed to process the resume: ' + error.message);
  }
};

// @desc    Get all user resumes
// @route   GET /api/resumes
// @access  Private
export const getMyResumes = async (req: AuthRequest, res: Response) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(resumes);
};

// @desc    Get resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResumeById = async (req: AuthRequest, res: Response) => {
  const resume = await Resume.findById(req.params.id);

  if (resume && resume.user.toString() === req.user._id.toString()) {
    res.json(resume);
  } else {
    res.status(404);
    throw new Error('Resume not found or unauthorized');
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req: AuthRequest, res: Response) => {
  const resume = await Resume.findById(req.params.id);

  if (resume && resume.user.toString() === req.user._id.toString()) {
    await Resume.deleteOne({ _id: resume._id });
    res.json({ message: 'Resume removed' });
  } else {
    res.status(404);
    throw new Error('Resume not found or unauthorized');
  }
};
