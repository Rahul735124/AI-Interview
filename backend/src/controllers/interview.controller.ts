import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import Interview from '../models/interview.model.js';
import Resume from '../models/resume.model.js';

// @desc    Create new mock interview
// @route   POST /api/interviews
// @access  Private
export const createInterview = async (req: AuthRequest, res: Response) => {
  const { resumeId, jobRole, company, difficulty, type } = req.body;

  try {
    let resumeContext = '';
    if (resumeId) {
      const resume = await Resume.findById(resumeId);
      if (resume && resume.user.toString() === req.user._id.toString()) {
        resumeContext = `Candidate Resume Context: Skills: ${resume.parsedData?.skills.join(', ')}. Experience: ${resume.parsedData?.experience.join(' ')}`;
      }
    }

    const systemPrompt = `You are an expert AI Interviewer conducting a ${difficulty} level ${type} interview for a ${jobRole} position at ${company}. 
    ${resumeContext}
    Start the interview by introducing yourself and asking the first question. Wait for the user's response before asking the next question.
    Keep your responses realistic, conversational, and evaluate the candidate implicitly.`;

    const interview = await Interview.create({
      user: req.user._id,
      resume: resumeId || undefined,
      jobRole,
      company,
      difficulty,
      type,
      status: 'In Progress',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
    });

    res.status(201).json(interview);
  } catch (error: any) {
    res.status(500);
    throw new Error('Failed to create interview: ' + error.message);
  }
};

// @desc    Get user's interviews
// @route   GET /api/interviews
// @access  Private
export const getMyInterviews = async (req: AuthRequest, res: Response) => {
  const interviews = await Interview.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(interviews);
};

// @desc    Get single interview by ID
// @route   GET /api/interviews/:id
// @access  Private
export const getInterviewById = async (req: AuthRequest, res: Response) => {
  const interview = await Interview.findById(req.params.id);

  if (interview && interview.user.toString() === req.user._id.toString()) {
    res.json(interview);
  } else {
    res.status(404);
    throw new Error('Interview not found');
  }
};

// @desc    Delete single interview by ID
// @route   DELETE /api/interviews/:id
// @access  Private
export const deleteInterview = async (req: AuthRequest, res: Response) => {
  const interview = await Interview.findById(req.params.id);

  if (interview && interview.user.toString() === req.user._id.toString()) {
    await Interview.deleteOne({ _id: interview._id });
    res.json({ message: 'Interview removed' });
  } else {
    res.status(404);
    throw new Error('Interview not found or unauthorized');
  }
};
