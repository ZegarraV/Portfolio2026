import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const ProjectsPage = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardColors = [
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
  ];

  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ZegarraV/repos?sort=updated&per_page=10');
        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedProjects = data.map((repo, index) => ({
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').toUpperCase(),
            description: repo.description || (t('projects.noDescription') || 'Sem descrição disponível.'),
            date: new Date(repo.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' }),
            technologies: repo.language ? [repo.language] : ['Geral'],
            color: cardColors[index % cardColors.length],
            githubUrl: repo.html_url,
            homepage: repo.homepage 
          }));
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Erro ao carregar projetos do GitHub:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubProjects();
  }, [t]);

  return (
    <>
      <Helmet>
        <title>{t('projects.metaTitle')}</title>
        <meta name="description" content={t('projects.metaDesc')} />
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
                {t('projects.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('projects.subtitle')}
              </p>
            </motion.div>

            {/* Timeline Area */}
            <div className="max-w-5xl mx-auto">
              {loading ? (

                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                  <p>Sincronizando com GitHub...</p>
                </div>
              ) : (
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block"></div>

                  {/* Projects Mapping */}
                  <div className="space-y-12">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background hidden md:block z-10"></div>

                        {/* Project Card */}
                        <div className="md:ml-20 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all group shadow-sm hover:shadow-xl">
                          <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                          <div className="p-8">
                            {/* Date Badge */}
                            <div className="flex items-center space-x-2 mb-4">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="text-sm font-semibold text-primary">
                                {project.date}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-foreground leading-relaxed mb-6">
                              {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                              {/* Só mostra o botão "Ver Projeto" se houver um link de site (homepage) no repo */}
                              {project.homepage && (
                                <Button
                                  variant="default"
                                  className="bg-primary hover:bg-primary/90"
                                  onClick={() => window.open(project.homepage, '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  {t('projects.viewProject')}
                                </Button>
                              )}
                              
                              <Button
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                                onClick={() => window.open(project.githubUrl, '_blank')}
                              >
                                <Github className="w-4 h-4 mr-2" />
                                {t('projects.sourceCode')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;