import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    label: 'Dark',
    icon: '🌙',
    vars: {
      '--background': '222 47% 11%',
      '--foreground': '220 13% 91%',
      '--card': '217 33% 17%',
      '--card-foreground': '220 13% 91%',
      '--popover': '217 33% 17%',
      '--popover-foreground': '220 13% 91%',
      '--primary': '199 89% 48%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '160 84% 39%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '215 25% 27%',
      '--muted-foreground': '220 13% 71%',
      '--accent': '199 89% 48%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 84% 60%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '215 25% 27%',
      '--input': '215 25% 27%',
      '--ring': '199 89% 48%',
    },
  },
  light: {
    label: 'Light',
    icon: '☀️',
    vars: {
      '--background': '210 40% 98%',
      '--foreground': '222 47% 11%',
      '--card': '0 0% 100%',
      '--card-foreground': '222 47% 11%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '222 47% 11%',
      '--primary': '199 89% 40%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '160 84% 32%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '210 40% 93%',
      '--muted-foreground': '215 16% 47%',
      '--accent': '199 89% 40%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 84% 60%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '214 32% 85%',
      '--input': '214 32% 85%',
      '--ring': '199 89% 40%',
    },
  },
  purple: {
    label: 'Purple',
    icon: '🔮',
    vars: {
      '--background': '270 40% 8%',
      '--foreground': '280 20% 92%',
      '--card': '268 35% 14%',
      '--card-foreground': '280 20% 92%',
      '--popover': '268 35% 14%',
      '--popover-foreground': '280 20% 92%',
      '--primary': '270 91% 65%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '300 60% 55%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '268 28% 22%',
      '--muted-foreground': '280 15% 68%',
      '--accent': '270 91% 65%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 84% 60%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '268 28% 22%',
      '--input': '268 28% 22%',
      '--ring': '270 91% 65%',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolioTheme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('portfolioTheme', theme);
    const root = document.documentElement;
    const vars = themes[theme]?.vars || themes.dark.vars;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    // Remove all theme classes and add the current one
    root.classList.remove('theme-dark', 'theme-light', 'theme-purple');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const cycleTheme = () => {
    const order = ['dark', 'light', 'purple'];
    const currentIndex = order.indexOf(theme);
    setTheme(order[(currentIndex + 1) % order.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
