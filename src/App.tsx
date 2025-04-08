/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext, useContext } from "react";
import { Home } from "./components/Home";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

// Notification 타입 정의
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

interface themeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface userContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);
const ThemeContext = createContext<themeContextType | undefined>(undefined);
const UserContext = createContext<userContextType | undefined>(undefined);

// 커스텀 훅: useNotificationContext
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within an AppProvider",
    );
  }
  return context;
};

// 커스텀 훅: useThemeContext
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};

// 커스텀 훅: useUserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const addNotification = (message: string, type: Notification["type"]) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const contextValue: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
  };

  const themeContextValue: themeContextType = {
    theme,
    toggleTheme,
  };

  const userContextValue: userContextType = {
    user,
    login,
    logout,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <UserContext.Provider value={userContextValue}>
        <NotificationContext.Provider value={contextValue}>
          <Home />
        </NotificationContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
