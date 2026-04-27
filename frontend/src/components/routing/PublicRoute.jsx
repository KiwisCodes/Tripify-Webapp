import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Navigate to="/login" replace />;
}
