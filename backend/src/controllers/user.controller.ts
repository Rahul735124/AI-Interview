import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import User from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';
import Interview from '../models/interview.model.js';
import Resume from '../models/resume.model.js';
import UpcomingInterview from '../models/upcomingInterview.model.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user profile & avatar
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Handle avatar upload if file exists
    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ai-interview/avatars' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          uploadStream.end(req.file?.buffer);
        });
        
        user.avatar = (result as any).secure_url;
      } catch (error) {
        res.status(500);
        throw new Error('Image upload failed');
      }
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/users/dashboard
// @access  Private
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user._id;

  // 1. Total Interviews
  const totalInterviews = await Interview.countDocuments({ user: userId });

  // 2. Completed Interviews for averages and trends
  const completedInterviews = await Interview.find({ user: userId, status: 'Completed' }).sort({ createdAt: 1 });

  let averageScore = 0;
  const performanceData: { name: string; score: number }[] = [];

  if (completedInterviews.length > 0) {
    let totalScore = 0;
    completedInterviews.forEach((interview) => {
      const score = interview.feedback?.overallScore || 0;
      totalScore += score;
      
      const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(interview.createdAt);
      const existingMonth = performanceData.find(d => d.name === month);
      if (existingMonth) {
        existingMonth.score = Math.round((existingMonth.score + score) / 2);
      } else {
        performanceData.push({ name: month, score });
      }
    });
    averageScore = Math.round(totalScore / completedInterviews.length);
  }

  // 3. Upcoming Interviews
  const upcomingInterviews = await UpcomingInterview.find({ user: userId }).sort({ date: 1 });

  // 4. Skills from latest resume
  const latestResume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });
  let skills: { name: string; level: number }[] = [];
  if (latestResume && latestResume.parsedData && latestResume.parsedData.skills) {
    skills = latestResume.parsedData.skills.map((skill: string) => ({
      name: skill,
      level: Math.floor(Math.random() * 20) + 70 // Random level between 70-90 for visuals
    })).slice(0, 6); // Top 6 skills
  }

  res.json({
    totalInterviews,
    averageScore,
    upcomingInterviews: upcomingInterviews.map(ui => ({
      id: ui._id,
      role: ui.role,
      company: ui.company,
      date: ui.date,
    })),
    performanceData: performanceData.length > 0 ? performanceData : [{ name: 'No Data', score: 0 }],
    skills: skills.length > 0 ? skills : [
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 }
    ],
  });
};

// @desc    Add upcoming interview
// @route   POST /api/users/upcoming
// @access  Private
export const addUpcomingInterview = async (req: AuthRequest, res: Response) => {
  const { role, company, date } = req.body;
  const upcoming = await UpcomingInterview.create({
    user: req.user._id,
    role,
    company,
    date,
  });
  res.status(201).json(upcoming);
};

// @desc    Delete upcoming interview
// @route   DELETE /api/users/upcoming/:id
// @access  Private
export const deleteUpcomingInterview = async (req: AuthRequest, res: Response) => {
  const upcoming = await UpcomingInterview.findById(req.params.id);
  if (upcoming && upcoming.user.toString() === req.user._id.toString()) {
    await upcoming.deleteOne();
    res.json({ message: 'Upcoming interview removed' });
  } else {
    res.status(404);
    throw new Error('Upcoming interview not found or unauthorized');
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: AuthRequest, res: Response) => {
  const users = await User.find({});
  res.json(users);
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};
