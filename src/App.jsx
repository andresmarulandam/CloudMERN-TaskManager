import {
  Navigate,
  Outlet,
  replace,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TaskDetails from './pages/TaskDetails';
import Tasks from './pages/Tasks';
import Trash from './pages/Trash';
import Users from './pages/Users';
import { useSelector } from 'react-redux';
import SideBar from './components/SideBar';

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className=" w-full h-screen flex flex-col md:flex-row">
      <div className=" w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <SideBar />
      </div>
      {/*<MobileSideBar/> */}
      <div className=" flex-1 overflow-y-auto">
        {/*<NavBar />*/}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <main className="w-full min-h-screen  bg-[#f3f4f6]">
      <Routes>
        {/*Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
