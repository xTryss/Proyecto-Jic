import React from 'react';
import ReportCard from './ReportCard';

const ReportList = ({ reports }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Reportes Recientes</h2>
      {reports.length === 0 ? (
        <p className="text-gray-500">No hay reportes recientes</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, index) => (
            <ReportCard key={index} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;