import React from 'react';
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  // /dashboard/tasks, el valor de path será 'dashboard'.
  // La variable path tendrá el valor del segundo segmento de la URL, es decir, 'dashboard' en este caso.
  const path = location.pathname.split('/')[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ element }) => {
    return (
      <Link
        to={element.link}
        onClick={closeSidebar}
        className={clsx(
          'w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]',
          path === element.link.split('/')[0]
            ? 'bg-blue-700 text-neutral-100'
            : '',
        )}
      >
        {element.icon}
        <span className="hover: text-[#2564ed]">{element.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">TaskMe</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink element={link} key={link.label} />
        ))}
      </div>

      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800 dark:text-white">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
