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
      <h1 className="text-3xl font-bold text-gray-900">
        {t('destinations.title')}
      </h1>
      <p className="text-lg text-gray-600">
        {t('destinations.subtitle')}
      </p>
      <p className="text-sm text-gray-500">
        {t('destinations.instructions')}
      </p>
    </motion.div>
  );
}