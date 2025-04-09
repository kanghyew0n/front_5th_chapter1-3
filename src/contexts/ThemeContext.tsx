import { createContext, ReactNode, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";

interface themeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<themeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  console.log(">> ThemeProvider");

  const toggleTheme = useCallback(() => {
    console.log(">> toggleTheme");
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const themeContextValue: themeContextType = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  console.log(">> useThemeContext");
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};
