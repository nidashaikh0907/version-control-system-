import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom"; //allows js to change the URL/page

//pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Repo from "./components/repo/Repo";
import Repository from "./components/Repository/Repository";
import StarredRepo from "./components/StarredRepo/StarredRepo";
import Issue from "./components/issue/Issue.jsx";

//Auth Context
import { useAuth } from "./authContext"; //stoes info of current logged in user

const ProjectRoutes = () => {
    //get current logged-in user and function to update it 
  const { currentUser, setCurrentUser } = useAuth();
  //used to navigate to another route programatically
  const navigate = useNavigate();

  useEffect(() => {
    //get the logged-in user id from browser storage
    const userIdFromStorage = localStorage.getItem("userId");

    //restore the user in AuthContext after page refresh
    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    //If user is not logged in and tries to access
    //a protected page,redirect them to authentication
    if (
      !userIdFromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }

    //If user already logged in and tries to visit the authentication page redirect to dashboard
    if (userIdFromStorage && window.location.pathname == "/auth") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path:"/create",
      element:<Repo/>
    },
    {
      path:"/repo/:id",
      element:<Repository/>
    },
    {
      path:"/starred",
      element:<StarredRepo/>
    },
    {
      path:"/repo/:id/issues",
      element:<Issue/>
    }
  ]);

  return element;
};

export default ProjectRoutes;
