import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setcurrentUser(userId);
    }
  }, []);

  const value = {
    currentUser,
    setcurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
