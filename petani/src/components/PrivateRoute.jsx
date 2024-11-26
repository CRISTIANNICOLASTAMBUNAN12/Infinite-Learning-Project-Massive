import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, role, requiredRole }) => {
  console.log('isAuthenticated:', isAuthenticated); // Debugging
  console.log('role:', role); // Debugging
  console.log('requiredRole:', requiredRole); // Debugging

  // Jika tidak terautentikasi, arahkan ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
