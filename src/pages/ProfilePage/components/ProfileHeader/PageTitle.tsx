import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function PageTitle() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <h1 className="text-2xl font-bold text-gray-900">
        {t('profile.title')}
      </h1>
      <p className="text-gray-600">
        {t('profile.subtitle')}
      </p>
    </motion.div>
  );
}