import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trophy, Loader } from 'lucide-react';

interface DrawSectionProps {
  onDraw: () => void;
}

export function DrawSection({ onDraw }: DrawSectionProps) {
  const { t } = useTranslation();
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = async () => {
    setIsDrawing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onDraw();
      toast.success('Draw completed successfully!');
    } catch (error) {
      toast.error('Failed to complete the draw. Please try again.');
    } finally {
      setIsDrawing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: isDrawing ? 360 : 0 }}
            transition={{ duration: 2, repeat: isDrawing ? Infinity : 0, ease: "linear" }}
          >
            <Trophy className="w-12 h-12 text-yellow-500" />
          </motion.div>
          <h2 className="text-xl font-semibold">
            {t('admin.performDraw')}
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Start the random selection process to determine this year's winners
          </p>
          <Button
            onClick={handleDraw}
            size="lg"
            className="w-full max-w-xs relative"
            disabled={isDrawing}
          >
            {isDrawing ? (
              <span className="flex items-center">
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Drawing...
              </span>
            ) : (
              t('admin.performDraw')
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}