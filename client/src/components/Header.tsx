import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  Settings,
  Logout,
  Search,
  DarkMode,
  Home
} from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return 'Home';
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' / ');
  };

  return (
    <header className="bg-white shadow-sm px-6 h-16 flex items-center justify-between fixed top-0 left-[256px] right-0 z-10">
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleSidebar} className="lg:hidden">
          <MenuIcon />
        </IconButton>
        <div className="flex items-center text-gray-700 font-medium">
          <Home className="w-5 h-5 mr-2" />
          <span>{getBreadcrumbs()}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-[300px] h-10 bg-gray-100 rounded-lg pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        <div className="flex items-center gap-4">
          <IconButton className="text-gray-600 hover:text-gray-800 bg-gray-100 p-2">
            <Notifications className="w-5 h-5" />
          </IconButton>
          <IconButton className="text-gray-600 hover:text-gray-800 bg-gray-100 p-2">
            <Settings className="w-5 h-5" />
          </IconButton>
          <IconButton className="text-gray-600 hover:text-gray-800 bg-gray-100 p-2">
            <DarkMode className="w-5 h-5" />
          </IconButton>

          <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src="https://ui-avatars.com/api/?name=User&background=AAC4FF&color=fff"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-gray-200"
              />
            </div>
            <IconButton
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 bg-gray-100 p-2"
            >
              <Logout className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
