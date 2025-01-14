import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../store/useStore';
import { WinnerCard } from './WinnerCard';
import { Card } from '../../components/ui/Card';
import { Trophy } from 'lucide-react';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function ResultsPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { winners, destinations } = useStore();
  const [showConfetti, setShowConfetti] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <>
      {showConfetti && winners.length > 0 && <Confetti />}
      <div className="space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">{t('results.title')}</h1>
            <p className="text-gray-100">{t('results.congratulations')}</p>
          </Card>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {winners.map((winner) => (
            <motion.div key={winner.id} variants={item}>
              <WinnerCard
                winner={winner}
                destination={
                  winner.preferences?.[0]
                    ? destinations.find((d) => d.id === winner.preferences![0])
                    : undefined
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {winners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 text-center">
              <p className="text-gray-600">
                {t('results.noWinners')}
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </>
  );
}