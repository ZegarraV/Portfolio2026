import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import PBHImg from '@/components/image/PBH.png';
import LifeImg from '@/components/image/Life.png';
import ValeImg from '@/components/image/vale.png';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const PrefeituraLogo = () => (
  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white flex items-center justify-center shadow-lg border border-border/30">
    <img src={PBHImg} alt="Prefeitura de Belo Horizonte" className="w-12 h-12 object-contain" />
  </div>
);

const LifeEyewearLogo = () => (
  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white flex items-center justify-center shadow-lg border border-border/30">
    <img src={LifeImg} alt="Life Eyewear" className="w-12 h-12 object-contain" />
  </div>
);

const ValeLogo = () => (
  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white flex items-center justify-center shadow-lg border border-border/30">
    <img src={ValeImg} alt="Vale" className="w-12 h-10 object-contain" />
  </div>
);

const logoMap = {
  e1: ValeLogo,
  e2: PrefeituraLogo,
  e3: LifeEyewearLogo,
};

const colorMap = {
  e1: 'from-emerald-500 to-teal-600',
  e2: 'from-blue-500 to-indigo-600',
  e3: 'from-purple-500 to-pink-500',
};

const ExperiencePage = () => {
  const { t } = useLanguage();

  const experienceKeys = ['e1', 'e2', 'e3'];

  const experiences = experienceKeys.map((key) => ({
    id: key,
    role: t(`experience.items.${key}.role`),
    company: t(`experience.items.${key}.company`),
    type: t(`experience.items.${key}.type`),
    duration: t(`experience.items.${key}.duration`),
    location: t(`experience.items.${key}.location`),
    description: t(`experience.items.${key}.description`),
    highlights: t(`experience.items.${key}.highlights`),
    skills: t(`experience.items.${key}.skills`),
    isCurrent: key === 'e1',
    color: colorMap[key],
    LogoComponent: logoMap[key],
  }));

  return (
    <>
      <Helmet>
        <title>{t('experience.metaTitle')}</title>
        <meta name="description" content={t('experience.metaDesc')} />
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
                {t('experience.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('experience.subtitle')}
              </p>
            </motion.div>

            {/* Experience Cards */}
            <div className="max-w-5xl mx-auto space-y-8">
              {experiences.map((exp, index) => {
                const { LogoComponent } = exp;
                return (
                  <motion.div
                    key={exp.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    whileHover={{
                      y: -4,
                      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25)',
                      transition: { duration: 0.2 },
                    }}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/60 transition-colors group cursor-default"
                  >
                    {/* Gradient Header bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${exp.color}`} />

                    <div className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                        {/* Company Logo */}
                        <div className="mb-4 md:mb-0">
                          <LogoComponent />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Role and Badge */}
                          <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                              {exp.role}
                            </h3>
                            {exp.isCurrent && (
                              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold px-3 py-1 rounded-full">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                {t('experience.current') || 'Atual'}
                              </span>
                            )}
                          </div>

                          <p className="text-lg font-semibold text-primary mb-1">
                            {exp.company} · <span className="font-normal text-muted-foreground text-base">{exp.type}</span>
                          </p>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {exp.duration}
                            </span>
                            <span className="hidden sm:block text-border">·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {exp.location}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-foreground leading-relaxed mb-6">
                            {exp.description}
                          </p>

                          {/* Highlights */}
                          <div className="space-y-2">
                            <span className="text-sm font-semibold text-foreground block mb-3">
                              {t('experience.highlights')}
                            </span>
                            <ul className="space-y-2">
                              {Array.isArray(exp.highlights) && exp.highlights.map((highlight, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: index * 0.1 + idx * 0.06 + 0.3 }}
                                  className="flex items-start space-x-3"
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${exp.color} mt-2 flex-shrink-0`} />
                                  <span className="text-foreground">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Skills badge */}
                          {exp.skills && exp.skills !== `experience.items.${exp.id}.skills` && (
                            <div className="mt-4 flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">🏆</span>
                              <span className="text-xs text-muted-foreground font-medium bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                                {exp.skills}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ExperiencePage;
