import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { useAuth } from '../../hooks/useAuth';
import { DrawManagement } from './DrawManagement';
import { EmployeeManagement } from './EmployeeManagement';
import { AccommodationManagement } from './AccommodationManagement';
import { UserSelections } from './UserSelections';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function AdminDashboard() {
  const { t } = useTranslation();
  const { isAuthenticated, isAdmin } = useAuth('admin');
  const [activeTab, setActiveTab] = React.useState('draw');

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-primary-600">
          {t('admin.title')}
        </h1>
        <p className="text-gray-600">
          {t('admin.subtitle')}
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-primary-50 w-full justify-start">
          <TabsTrigger value="draw">
            {t('admin.tabs.draw')}
          </TabsTrigger>
          <TabsTrigger value="selections">
            {t('admin.tabs.selections')}
          </TabsTrigger>
          <TabsTrigger value="employees">
            {t('admin.tabs.employees')}
          </TabsTrigger>
          <TabsTrigger value="accommodations">
            {t('admin.tabs.accommodations')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="mt-6">
          <DrawManagement />
        </TabsContent>

        <TabsContent value="selections" className="mt-6">
          <UserSelections />
        </TabsContent>

        <TabsContent value="employees" className="mt-6">
          <EmployeeManagement />
        </TabsContent>

        <TabsContent value="accommodations" className="mt-6">
          <AccommodationManagement />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}