import React from 'react';
import Header from '../Components/AdminPages/Header';
import Sidebar from '../Components/AdminPages/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
