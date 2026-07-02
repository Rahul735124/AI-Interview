import express from 'express';
import multer from 'multer';
import { protect } from '../middlewares/auth.middleware.js';
import { uploadResume, getMyResumes, getResumeById, deleteResume } from '../controllers/resume.controller.js';

const router = express.Router();

// Multer setup for memory storage (buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for PDFs
});

router.route('/')
  .get(protect, getMyResumes)
  .post(protect, upload.single('resume'), uploadResume);

router.route('/:id')
  .get(protect, getResumeById)
  .delete(protect, deleteResume);

export default router;
