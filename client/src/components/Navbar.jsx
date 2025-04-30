import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  HomeIcon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional basic styling

export default function Navbar({ collapsed, setCollapsed }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const menuItems = [
    { to: '/feed', label: 'Home', icon: HomeIcon },
    { to: '/notifications', label: 'Notifications', icon: BellIcon },
    { to: '/profile', label: 'Account', icon: UserIcon },
    ...(role === 'admin' ? [{ to: '/admin', label: 'Admin', icon: Cog6ToothIcon }] : []),
    { to: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  ];

  return (
    <div
      className={`h-screen bg-black border-r border-white/10 text-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } fixed top-0 left-0 z-50 flex flex-col justify-between p-4`}
    >
      <div>
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white mb-6 focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Navigation links */}
        {token && (
          <ul className="space-y-4 text-white/70 text-lg">
            {menuItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-white flex items-center space-x-2 transition-colors"
                >
                  <Tippy content={label} disabled={!collapsed} placement="right">
                    <span>
                      <Icon className="h-5 w-5" />
                    </span>
                  </Tippy>
                  {!collapsed && <span className='pl-2'>{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
