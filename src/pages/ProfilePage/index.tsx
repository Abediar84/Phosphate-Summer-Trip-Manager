import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ProfileHeader } from './components/ProfileHeader';
import { CurrentPreferences } from './CurrentPreferences';
import { TravelHistory } from './TravelHistory';

export function ProfilePage() {
  const { isAuthenticated, currentEmployee } = useAuth();

  if (!isAuthenticated || !currentEmployee) {
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
      <ProfileHeader />
      
      <div className="grid grid-cols-1 gap-8">
        <CurrentPreferences employee={currentEmployee} />
        <TravelHistory employee={currentEmployee} />
      </div>
    </motion.div>
  );
}