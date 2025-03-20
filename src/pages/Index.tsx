
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/services/authService';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard if logged in, otherwise to sign-in
    if (isLoggedIn()) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  }, [navigate]);
  
  return null;
};

export default Index;
