import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock login function
  const login = async (email, password) => {
    try {
      // In a real app, you would call your API here, i Be Tu is dping this for testing pusrposes, in prod, there will be logic for this.
      setUser({ email, name: "Be Tu" });
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Mock signup function
  const signup = async (name, email, password) => {
    try {
      // In a real app, you would call your API here, i Be Tu is dping this for testing pusrposes, in prod, there will be logic for this.
     setUser({ email, name });
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

useEffect(() => {
  const checkAuth = async () => {
    setIsLoading(true);
    // No auto-login — user must login manually , i Be Tu is dping this for testing pusrposes, in prod, there will be logic for this.
    setUser(null);
    setIsLoading(false);
  };

  checkAuth();
},[]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);