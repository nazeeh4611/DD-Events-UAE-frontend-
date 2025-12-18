import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "../Components/AdminPages/Login";
import Dashboard from "../Components/AdminPages/Dashboard";
import Events from "../Components/AdminPages/Events";
import ProtectedRoute from "./Protect/";
import AdminLayout from "./Layout";
import Clients from "../Components/AdminPages/Client";

function AdminRoutes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/events" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Events />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/clients" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Clients />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
       
      </Routes>
    </div>
  );
}

export default AdminRoutes;