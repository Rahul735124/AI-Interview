import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createInterview, getMyInterviews, getInterviewById, deleteInterview } from '../controllers/interview.controller.js';

const router = express.Router();

router.route('/')
  .post(protect, createInterview)
  .get(protect, getMyInterviews);

router.route('/:id')
  .get(protect, getInterviewById)
  .delete(protect, deleteInterview);

export default router;
