import { createContext, ReactNode, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  console.log(">> NotificationProvider");

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      console.log(">> addNotification");

      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    console.log(">> removeNotification");
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const notificationContextValue: NotificationContextType = useMemo(() => {
    return {
      notifications,
      addNotification,
      removeNotification,
    };
  }, [notifications, addNotification, removeNotification]);

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => {
  console.log(">> useNotificationContext");

  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within an AppProvider",
    );
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationSelector = <T,>(
  selector: (context: NotificationContextType) => T,
): T => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationSelector must be used within a NotificationProvider",
    );
  }
  return selector(context);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAddNotification = () =>
  useNotificationSelector((ctx) => ctx.addNotification);
