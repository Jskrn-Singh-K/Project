import { Outlet } from "react-router-dom";
import AdminNavigation from "./AdminComponent/AdminNavigation"; // Admin Sidebar/Nav
import AdminNavBar from "./AdminComponent/AdminNavBar"; // Admin Top Bar

function AdminLayout() {
  return (
    <div >
      {/* Admin Sidebar/Navigation */}
      <AdminNavigation />
      
      <div className="grid grid-cols-5">
        {/* Admin Top Bar */}
        <div >
        <AdminNavBar />
        </div>
        
        
        <main className="col-span-4">
          {/* Content specific to admin rendered here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
