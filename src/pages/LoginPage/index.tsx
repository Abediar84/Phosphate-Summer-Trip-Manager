import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { Card } from '../../components/ui/Card';
import { COMPANY_NAME } from '../../assets/images/misr-phosphate-logo';

export function LoginPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center">
            <img 
              src="/images/misr-phosphate-logo.png"
              className="w-1/2 h-auto mb-4"
            />
            <span className={`text-2xl font-semibold text-primary-600 ${
              i18n.language === 'ar' && 'font-arabic'
            }`}>
              {COMPANY_NAME[i18n.language as 'en' | 'ar']}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('login.title')}
          </h1>
          <p className="text-gray-600">
            {t('login.subtitle')}
          </p>
        </div>

        <Card className="p-6">
          <LoginForm />
        </Card>
      </motion.div>
    </div>
  );
}