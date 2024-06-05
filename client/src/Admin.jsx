import {useEffect,useRef} from 'react';
import { Routes, Route, Outlet, useLocation} from 'react-router-dom';
import Sidebar from "./components/admin/Sidebar"
import ManageBloodStock from './routes/admin/ManageBloodStock';
import Header from './components/admin/Header';

function Admin() {
  const location = useLocation();
  const previousLocation = useRef(location.pathname);

  useEffect(() => {
    const isRouteChanged = location.pathname !== previousLocation.current;
    if (isRouteChanged) {
      previousLocation.current = location.pathname;
    }
  }, [location]);

  return (
    <div className='flex'>
      <Sidebar/>
        <div className='flex flex-col w-full'>
          <Header />
          <div className='px-10 py-5'>
            <Routes>
              <Route path="/" element={<ManageBloodStock />} />
            </Routes>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default Admin