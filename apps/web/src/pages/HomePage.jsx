import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

// Typing animation hook
function useTypingAnimation(texts, typingSpeed = 80, pauseDuration = 1800, deletingSpeed = 45) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!isDeleting && displayText === currentText) {
      const pause = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, pauseDuration, deletingSpeed]);

  return displayText;
}

const HomePage = () => {
  const { t } = useLanguage();

  const roleTexts = [
    t('home.subtitle'),
    'Full Stack Developer',
    'Open Source Enthusiast',
  ];

  const typedRole = useTypingAnimation(roleTexts);

  return (
    <>
      <Helmet>
        <title>{t('home.metaTitle')}</title>
        <meta name="description" content={t('home.metaDesc')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1507146815454-9faa99d579aa"
              alt="Modern technology workspace with laptop and code"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{t('home.badge')}</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
                >
                  {t('home.title')}
                </motion.h1>

                {/* Typing Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex items-center justify-center space-x-3 min-h-[2.5rem]"
                >
                  <Code className="w-6 h-6 text-primary flex-shrink-0" />
                  <p className="text-2xl sm:text-3xl font-semibold text-primary typing-cursor">
                    {typedRole}
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                >
                  {t('home.description')}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-20"
                >
                  <Link to="/projects">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg group"
                    >
                      {t('home.viewProjects')}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-6 text-lg"
                    >
                      {t('home.getInTouch')}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator — outside inner container, anchored to section bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs text-gray-400 tracking-widest uppercase">{t('home.scroll')}</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-6 h-10 border-2 border-primary/60 rounded-full flex items-start justify-center p-2"
              >
                <div className="w-1 h-2 bg-primary rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
