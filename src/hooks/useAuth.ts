import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { UserRole } from '../types';

export function useAuth(requiredRole?: UserRole) {
  const navigate = useNavigate();
  const { currentEmployee } = useStore();

  useEffect(() => {
    if (!currentEmployee) {
      navigate('/', { replace: true });
      return;
    }

    if (requiredRole && currentEmployee.role !== requiredRole) {
      navigate('/destinations', { replace: true });
    }
  }, [currentEmployee, navigate, requiredRole]);

  return {
    isAuthenticated: !!currentEmployee,
    currentEmployee,
    isAdmin: currentEmployee?.role === 'admin',
  };
}