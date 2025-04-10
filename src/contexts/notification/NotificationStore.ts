import { useState } from "react";
import { Notification } from "./NotificationTypes";
import { useCallback } from "../../@lib";

export const useNotificationStore = () => {
  console.log("useNotificationStore");

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
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
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
