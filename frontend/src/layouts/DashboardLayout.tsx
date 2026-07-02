import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { logout as logoutApi } from '../services/auth.service';
import { LayoutDashboard, UserCircle, LogOut, FileText, MessageSquare, Code, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Resumes', path: '/resumes', icon: <FileText size={20} /> },
    { name: 'Interviews', path: '/interviews', icon: <MessageSquare size={20} /> },
    { name: 'Coding', path: '/coding', icon: <Code size={20} /> },
    { name: 'Profile', path: '/profile', icon: <UserCircle size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0A0F1C]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2 w-full overflow-hidden">
            <img src="/logo.svg" alt="Rahul-InterviewPrep Logo" className="w-8 h-8 object-contain flex-shrink-0" />
            <span className="text-lg font-bold text-primary truncate tracking-tight">Rahul-InterviewPrep</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          {user?.role === 'admin' && (
            <>
              <div className="my-2 border-t border-gray-200 dark:border-gray-800" />
              <Link
                to="/admin"
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <ShieldAlert size={20} />
                <span>Admin Panel</span>
              </Link>
            </>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <img src={user?.avatar} alt="Avatar" className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={20} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header (basic) */}
        <header className="md:hidden h-16 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 flex items-center px-4 justify-between">
          <span className="text-lg font-bold text-primary flex items-center space-x-2">
            <img src="/logo.svg" alt="Rahul-InterviewPrep Logo" className="w-6 h-6 object-contain" />
            <span>Rahul-InterviewPrep</span>
          </span>
          <img src={user?.avatar} alt="Avatar" className="h-8 w-8 rounded-full" />
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
