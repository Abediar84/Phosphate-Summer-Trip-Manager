import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download, FileText, Mail, MessageSquare, Check, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Employee } from '../../../types';
import { generateWinnersReport } from '../../../lib/reports';
import { useStore } from '../../../store/useStore';

interface WinnersReportProps {
  winners: Employee[];
}

export function WinnersReport({ winners }: WinnersReportProps) {
  const { t } = useTranslation();
  const { destinations, accommodations } = useStore();

  const handleDownload = () => {
    const report = generateWinnersReport(winners);
    const blob = new Blob([report], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `winners-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold">{t('admin.drawManagement.winnersReport')}</h3>
        </div>
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex items-center gap-2"
          disabled={winners.length === 0}
        >
          <Download className="w-4 h-4" />
          {t('admin.drawManagement.downloadReport')}
        </Button>
      </div>

      <div className="space-y-4">
        {winners.length > 0 ? (
          winners.map((winner) => {
            const selection = winner.preferences?.[0];
            const destination = selection && destinations.find(d => d.id === selection.destinationId);
            const accommodation = selection && accommodations.find(a => a.id === selection.accommodationId);

            return (
              <div
                key={winner.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="p-4 border-b bg-gray-50">
                  <h4 className="font-semibold text-lg">{winner.name}</h4>
                  <p className="text-sm text-gray-600">ID: {winner.id}</p>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">
                      {t('admin.drawManagement.winnerDetails.employeeInfo')}
                    </h5>
                    <p className="text-sm text-gray-600">
                      <span className="capitalize">{winner.jobGrade}</span>
                      <span className="mx-2">•</span>
                      {winner.email}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">
                      {t('admin.drawManagement.winnerDetails.destination')}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {destination ? destination.name : '-'}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">
                      {t('admin.drawManagement.winnerDetails.accommodation')}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {accommodation ? accommodation.name : '-'}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">
                      {t('admin.drawManagement.winnerDetails.dates')}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {selection ? new Date(selection.weekStart).toLocaleDateString() : '-'}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span className="text-gray-600">Email:</span>
                    {winner.email ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-gray-600">WhatsApp:</span>
                    {winner.mobileNo ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">{t('admin.drawManagement.noWinners')}</p>
          </div>
        )}
      </div>
    </Card>
  );
}