import { Request, Response } from 'express';
import User from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        accessToken,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.comparePassword(password))) {
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        accessToken,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      res.status(401);
      throw new Error('Not authorized, no refresh token');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as any;

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      res.status(403);
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.jwt;
    if (refreshToken) {
      const user = await User.findOne({ refreshToken });
      if (user) {
        user.refreshToken = undefined;
        await user.save();
      }
    }

    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
