import { Outlet } from "react-router-dom";
import Header from "../components/admin/Header/Header";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import { useSidebar } from "../hooks/useSidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/global.css";
const AdminLayout = () => {
  const { collapsed, toggle } = useSidebar();

  return (
    <>
      <div className="adminlayout">
        <ToastContainer position="top-right" autoClose={2000} />
        <Header collapsed={collapsed} onToggle={toggle} />
        <Sidebar collapsed={collapsed} />
        <main className={`main-content${collapsed ? " collapsed" : ""}`}>
          <div className="container-fluid">
            <Outlet />
          </div>
        </main> 
      </div>
    </>
  );
};

export default AdminLayout;
