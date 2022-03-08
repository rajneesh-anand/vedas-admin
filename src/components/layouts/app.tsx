import React, { useState } from "react";
import Sidebar from "@components/layouts/sidebar";
import Header from "@components/layouts/header";

const AdminLayout: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 py-2 w-full max-w-9xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
