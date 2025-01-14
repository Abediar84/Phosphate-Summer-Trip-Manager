import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Download } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateTravelReport, generateWinnersReport } from '../../lib/reports';

export function ReportSection() {
  const { t } = useTranslation();
  const { employees, winners } = useStore();

  const handleTravelReport = () => {
    const report = generateTravelReport(employees);
    downloadReport(report, 'travel-history-report.csv');
  };

  const handleWinnersReport = () => {
    const report = generateWinnersReport(winners);
    downloadReport(report, 'winners-report.csv');
  };

  const downloadReport = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            {t('admin.generateReport')}
          </h2>
          <p className="text-gray-600">
            Download detailed reports in CSV format
          </p>
        </div>
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={handleTravelReport}
          className="flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Travel History Report
        </Button>
        
        <Button
          variant="outline"
          onClick={handleWinnersReport}
          className="flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Winners Report
        </Button>
      </div>
    </Card>
  );
}