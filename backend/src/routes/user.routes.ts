import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middlewares/auth.middleware.js';
import { getUserProfile, updateUserProfile, getDashboardStats, getUsers, deleteUser, addUpcomingInterview, deleteUpcomingInterview } from '../controllers/user.controller.js';

const router = express.Router();

// Multer setup for memory storage (buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('avatar'), updateUserProfile);

router.get('/dashboard', protect, getDashboardStats);

router.route('/upcoming')
  .post(protect, addUpcomingInterview);

router.route('/upcoming/:id')
  .delete(protect, deleteUpcomingInterview);

export default router;
