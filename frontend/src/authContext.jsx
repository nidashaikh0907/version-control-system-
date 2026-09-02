import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
import { use } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const[username,setUsername]=useState(null);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username=localStorage.getItem("username");
    if (userId) {
      setCurrentUser(userId);
    }
     if (username) {
      setUsername(username);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    username,
    setUsername
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
