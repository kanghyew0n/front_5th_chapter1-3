import { createContext, ReactNode, useContext } from "react";
import { useNotificationStore } from "./NotificationStore";
import { NotificationContextType } from "./NotificationTypes";
import { useMemo } from "../../@lib";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  console.log("NotificationProvider");

  const store = useNotificationStore();

  const contextValue = useMemo(() => store, [store]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => {
  console.log("useNotificationContext");

  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within NotificationProvider",
    );
  }
  return context;
};
