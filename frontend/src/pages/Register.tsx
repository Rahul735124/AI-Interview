import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { register as registerApi } from '../services/auth.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthUser = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);
      setServerError('');
      const response = await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setAuthUser(response);
      navigate('/dashboard');
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-[#0A0F1C]">
      
      {/* Left Side: Animated Brand / Marketing (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-indigo-900 to-purple-950 text-white">
        
        {/* Animated Background Shapes */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-3xl"
        />
        
        <div className="relative z-10 p-12 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start mb-8 space-y-4"
          >
            <div className="p-4 bg-white rounded-2xl shadow-xl shadow-black/20">
              <img src="/logo.svg" alt="Rahul-InterviewPrep Logo" className="w-16 h-16 object-contain" />
            </div>
            <span className="text-4xl font-extrabold tracking-tight drop-shadow-md">Rahul-InterviewPrep</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Start your journey to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">career success.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Join thousands of professionals. Practice mock interviews, optimize your resume for ATS, and level up with coding challenges to land your dream job faster. Everything you need to succeed, all in one place.
            </p>
            
            <div className="flex items-center space-x-4 text-sm font-medium text-gray-300 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-2 pr-6 w-fit">
              <div className="bg-primary flex items-center justify-center h-8 w-8 rounded-full">
                <Sparkles size={14} className="text-white" />
              </div>
              <span>Free tier available to get you started</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto relative">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white dark:bg-card-dark rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-8 sm:p-10 border border-gray-100 dark:border-gray-800 my-auto"
        >
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Create Account
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 dark:text-gray-400"
            >
              Start your interview preparation today
            </motion.p>
          </div>

          {serverError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-danger/10 border border-danger/20 text-danger rounded-xl text-sm text-center font-medium"
            >
              {serverError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
                error={errors.name?.message}
                className="bg-gray-50 dark:bg-gray-900/50"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                error={errors.email?.message}
                className="bg-gray-50 dark:bg-gray-900/50"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
                className="bg-gray-50 dark:bg-gray-900/50"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                className="bg-gray-50 dark:bg-gray-900/50"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="pt-4">
              <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group" isLoading={isLoading}>
                Create Account
                {!isLoading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </motion.div>
          </form>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.7 }}
            className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm"
          >
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">
              Sign in here
            </Link>
          </motion.p>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 mb-4 w-full text-center px-4"
        >
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2026 R-IP • AI-Powered Interview Preparation Platform • All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
