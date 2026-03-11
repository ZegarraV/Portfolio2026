import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import emailjs from '@emailjs/browser';
import EMAILJS_CONFIG from '@/config/emailJsConfig.js';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/vinicius-zegarra-palhares/',
      color: 'hover:text-blue-500',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/ZegarraV',
      color: 'hover:text-gray-400',
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      href: 'https://www.instagram.com/zegarravp',
      color: 'hover:text-pink-500',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:zegarravdev@gmail.com',
      color: 'hover:text-red-500',
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameReq');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailReq');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInv');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.msgReq');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const time = new Date().toLocaleString('pt-BR');

    // Organizando os dados para o EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: time,
      to_email: 'zegarravdev@gmail.com',
      recipient: 'zegarravdev@gmail.com',
    };

    try {
      // Usamos Promise.all para disparar os dois e-mails simultaneamente
      await Promise.all([
        // 2. Email para VOCÊ
        emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
          { ...templateParams, title: `Nova mensagem de: ${formData.name}` },
          EMAILJS_CONFIG.PUBLIC_KEY
        ),
        // 3. Email de confirmação para o CLIENTE (Sender)
        emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
          { ...templateParams, title: "Recebemos sua mensagem!" },
          EMAILJS_CONFIG.PUBLIC_KEY
        )
      ]);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Erro no envio:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.metaTitle')}</title>
        <meta name="description" content={t('contact.metaDesc')} />
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
                {t('contact.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      {t('contact.formTitle')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          {t('contact.nameLabel')}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t('contact.namePlaceholder')}
                          className={`bg-background border-border text-foreground placeholder:text-muted-foreground ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          {t('contact.emailLabel')}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('contact.emailPlaceholder')}
                          className={`bg-background border-border text-foreground placeholder:text-muted-foreground ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          {t('contact.messageLabel')}
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t('contact.messagePlaceholder')}
                          rows={6}
                          className={`bg-background border-border text-foreground placeholder:text-muted-foreground resize-none ${
                            errors.message ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500">{errors.message}</p>
                        )}
                      </div>

                      {submitStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-green-100 text-green-700 rounded-lg"
                        >
                          Mensagem enviada com sucesso! Retornarei em breve.
                        </motion.div>
                      )}
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg flex items-center gap-2"
                        >
                          <span className="font-bold">Oops!</span> Ocorreu um erro ao enviar. Tente novamente mais tarde ou me chame no WhatsApp.
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
                      >
                        {isSubmitting ? t('contact.sending') : t('contact.send')}
                      </Button>
                    </form>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-8"
                >
                  {/* Social Links */}
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      {t('contact.connectTitle')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center justify-center p-6 bg-background border border-border rounded-xl hover:border-primary transition-all group ${social.color}`}
                          >
                            <Icon className="w-8 h-8 mb-3 text-foreground group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-foreground">
                              {social.name}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {t('contact.collabTitle')}
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      {t('contact.collabP1')}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {t('contact.collabP2')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;