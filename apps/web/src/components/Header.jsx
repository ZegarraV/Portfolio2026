import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useTheme, themes } from '@/context/ThemeContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, cycleTheme } = useTheme();
  const current = themes[theme];
  const themeOrder = ['dark', 'light', 'purple'];
  const nextTheme = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];

  return (
    <button
      onClick={cycleTheme}
      title={`Switch to ${themes[nextTheme].label} theme`}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/50 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 text-foreground hover:text-primary text-xs font-medium"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.7, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="text-base leading-none"
        >
          {current.icon}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={`label-${theme}`}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 4 }}
          transition={{ duration: 0.15 }}
        >
          {current.label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.home'), path: '/' },
    { name: t('header.about'), path: '/about' },
    { name: t('header.projects'), path: '/projects' },
    { name: t('header.experience'), path: '/experience' },
    { name: t('header.contact'), path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-md shadow-primary/20 relative overflow-hidden">
              {/* Person silhouette */}
              <svg viewBox="0 0 40 40" className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" fill="url(#logoGrad)" />
                {/* Head */}
                <circle cx="20" cy="13" r="5.5" fill="white" opacity="0.95" />
                {/* Body */}
                <path d="M9 34 C9 26 13 22 20 22 C27 22 31 26 31 34" fill="white" opacity="0.95" />
              </svg>
              {/* VZ initials overlay */}
              <span className="relative z-10 text-white font-extrabold text-xs tracking-tight leading-none" style={{textShadow:'0 1px 3px rgba(0,0,0,0.3)'}}>VZ</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Vinicius Zegarra<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 text-foreground hover:text-primary hover:bg-primary/10 transition-colors px-2"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium text-xs"
                >
                  {language === 'pt-BR' ? 'PT' : 'EN'}
                </motion.span>
              </AnimatePresence>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-card border-border">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">VZ</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{t('header.menu')}</span>
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all text-left text-sm ${
                        isActive(link.path)
                          ? 'text-primary bg-primary/10 border-l-4 border-primary'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-2">
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
