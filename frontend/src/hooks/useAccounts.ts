// src/hooks/useAccounts.ts
import { useState, useEffect } from 'react';
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import IUser from '../types/user.type';

const useAccounts = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    const handleLogout = () => {
      logOut();
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return {
    showModeratorBoard,
    showAdminBoard,
    currentUser,
    logOut,
  };
};

export default useAccounts;
