import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, Heart, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ZegarraV', label: 'GitHub', color: 'hover:bg-gray-700' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vinicius-zegarra-palhares/', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/zegarravp', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Mail, href: 'mailto:zegarravdev@gmail.com', label: 'Email', color: 'hover:bg-primary' },
  ];

  const quickLinks = [
    { name: t('header.home'), path: '/' },
    { name: t('header.about'), path: '/about' },
    { name: t('header.projects'), path: '/projects' },
    { name: t('header.experience'), path: '/experience' },
    { name: t('header.contact'), path: '/contact' },
  ];

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Top gradient line */}
      <div className="footer-gradient-line" />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 28px,
            hsl(var(--primary)) 28px,
            hsl(var(--primary)) 29px
          ), repeating-linear-gradient(
            90deg,
            transparent,
            transparent 28px,
            hsl(var(--primary)) 28px,
            hsl(var(--primary)) 29px
          )`,
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">

          {/* Brand Section — wider */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 relative overflow-hidden">
                <svg viewBox="0 0 40 40" className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="13" r="5.5" fill="white" opacity="0.95" />
                  <path d="M9 34 C9 26 13 22 20 22 C27 22 31 26 31 34" fill="white" opacity="0.95" />
                </svg>
                <span className="relative z-10 text-white font-extrabold text-xs tracking-tight leading-none" style={{textShadow:'0 1px 3px rgba(0,0,0,0.3)'}}>VZ</span>
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">Vinicius Zegarra<span className="text-primary">.</span></span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t('footer.subtitle')}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-9 h-9 rounded-lg bg-muted/60 border border-border/50 ${social.color} hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-md`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 block">
              {t('footer.quickLinks')}
            </span>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-primary">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status / Contact column */}
          <div className="md:col-span-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 block">
              {t('footer.connect')}
            </span>
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1.5 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-xs text-secondary font-medium">Disponível para projetos</span>
            </div>
            <div className="space-y-2">
              <a
                href="mailto:zegarravdev@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span>zegarravdev@gmail.com</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/ZegarraV"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors group"
              >
                <Github className="w-4 h-4" />
                <span>github.com/ZegarraV</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs flex items-center gap-1.5">
            © {currentYear} Vinicius Zegarra.
            <span className="text-muted-foreground/60">{t('footer.rights')}</span>
          </p>
          <p className="text-muted-foreground/60 text-xs flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" /> em React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
