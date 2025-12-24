
"use client";

import * as React from 'react';
import { type ReactNode, createContext, useContext } from 'react';

type Theme = "dark" | "light";
type Direction = "ltr" | "rtl";

type AppContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  direction: Direction;
  setDirection: (direction: Direction) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [direction, setDirection] = React.useState<Direction>("ltr");
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Set theme to dark by default
    setTheme("dark");
    // Always set direction to LTR
    setDirection("ltr");
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme, isMounted]);
  
  React.useEffect(() => {
    if (isMounted) {
      document.documentElement.dir = direction;
    }
  }, [direction, isMounted]);

  const contextValue = {
    theme,
    setTheme,
    direction,
    setDirection,
  };
  
  if (!isMounted) {
    return null;
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a Providers component");
  }
  return context;
}
