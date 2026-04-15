import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute({ children }) {
  // const token = localStorage.getItem('tripify_token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}
