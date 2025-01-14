import { NavLink } from 'react-router-dom';
import { Home, Description, Receipt, Assessment } from '@mui/icons-material';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const menuItems = [
    { icon: <Home />, text: 'Home', path: '/' },
    { icon: <Description />, text: 'Invoices', path: '/invoices' },
    { icon: <Receipt />, text: 'Bills', path: '/bills' },
    { icon: <Assessment />, text: 'Reports', path: '/reports' },
  ];

  const renderMenuItem = (item: { icon: JSX.Element; text: string; path: string }) => {
    const isInteractive = item.text === 'Invoices';

    if (isInteractive) {
      return (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-600 ${
              isActive ? 'bg-sidebar-active text-gray-800' : ''
            } hover:bg-sidebar-hover cursor-pointer transition-colors`
          }
        >
          <span className="text-[20px]">{item.icon}</span>
          <span className="text-sm font-medium">{item.text}</span>
        </NavLink>
      );
    }

    return (
      <div
        key={item.path}
        className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-400 hover:bg-sidebar-hover cursor-pointer transition-colors"
      >
        <span className="text-[20px]">{item.icon}</span>
        <span className="text-sm font-medium">{item.text}</span>
      </div>
    );
  };

  return (
    <div className={`bg-sidebar-bg h-full transition-all duration-300 rounded-r-2xl ${
      isOpen ? 'w-64' : 'w-0 lg:w-64'
    } overflow-hidden`}>
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="text-2xl font-bold text-gray-800">Anthony Corp</div>
        </div>
        <div className="flex flex-col flex-grow p-4">
          <div className="text-sm font-medium text-gray-600 px-2 mb-4">Menu</div>
          {menuItems.map(renderMenuItem)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
