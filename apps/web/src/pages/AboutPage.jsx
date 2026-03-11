import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Code2, Database, Palette, Server, Smartphone, Globe, Layers, Terminal, Cpu, Braces, FileCode2, Workflow } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import fotoPerfil from '@/components/image/Eu.png';

const AboutPage = () => {
  const { t } = useLanguage();

  const skills = [
    { name: 'React',             icon: Code2,      color: 'text-cyan-400' },
    { name: 'JavaScript',        icon: Code2,      color: 'text-yellow-400' },
    { name: 'Python',            icon: Code2,      color: 'text-blue-400' },
    { name: 'TypeScript',        icon: Code2,      color: 'text-blue-500' },
    { name: 'TailwindCSS',       icon: Palette,    color: 'text-cyan-500' },
    { name: 'Node.js',           icon: Server,     color: 'text-green-500' },
    { name: 'MySQL',             icon: Database,   color: 'text-green-600' },
    { name: 'REST APIs',         icon: Globe,      color: 'text-purple-400' },
    { name: 'Responsive Design', icon: Smartphone, color: 'text-pink-400' },
    { name: 'Flutter',           icon: Code2,     color: 'text-sky-400' },
    { name: 'HTML',              icon: FileCode2,  color: 'text-orange-500' },
    { name: 'CSS',               icon: Palette,     color: 'text-blue-400' },
    { name: 'Swift',             icon: Code2,   color: 'text-orange-400' },
    { name: 'C',                 icon: Code2,   color: 'text-indigo-400' },
    { name: 'Java',              icon: Code2,        color: 'text-red-400' },
  ];

  const education = [
    {
      degree: t('about.edu1.degree'),
      institution: t('about.edu1.institution'),
      period: t('about.edu1.period'),
      description: t('about.edu1.description'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('about.metaTitle')}</title>
        <meta name="description" content={t('about.metaDesc')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t('about.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.subtitle')}
              </p>
            </motion.div>

            {/* Profile Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Photo with hover animation */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <motion.div
                  className="relative group"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl"
                    variants={{
                      rest: { rotate: 6, scale: 1, opacity: 0.8 },
                      hover: { rotate: 10, scale: 1.04, opacity: 1 },
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-primary/40 rounded-2xl"
                    variants={{
                      rest: { rotate: -3, scale: 1, opacity: 0 },
                      hover: { rotate: -5, scale: 1.02, opacity: 1 },
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                  <motion.img
                    src={fotoPerfil}
                    alt="Vinícius Zegarra Palhares - Professional portrait"
                    className="relative rounded-2xl w-full max-w-md h-auto object-cover shadow-2xl"
                    variants={{
                      rest: { scale: 1, filter: 'brightness(1)' },
                      hover: { scale: 1.03, filter: 'brightness(1.08)' },
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none"
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {t('about.hello')}
                  </h2>
                  <p className="text-lg text-foreground leading-relaxed">
                    {t('about.p1')}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {t('about.p2')}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {t('about.p3')}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                {t('about.skillsTitle')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                      whileHover={{ y: -4, scale: 1.05 }}
                      className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-colors group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className={`${skill.color} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-foreground font-medium text-center">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                {t('about.educationTitle')}
              </h2>
              <div className="max-w-3xl mx-auto">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">🎓</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-primary font-semibold mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-muted-foreground mb-3">
                          {edu.period}
                        </p>
                        <p className="text-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
