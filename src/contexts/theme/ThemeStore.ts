import { useState } from "react";
import { useCallback } from "../../@lib";

export const useThemeStore = () => {
  console.log("useThemeStore");

  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return {
    theme,
    toggleTheme,
  };
};
