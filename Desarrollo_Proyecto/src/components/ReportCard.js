import React from 'react';

const ReportCard = ({ report }) => {
  const getAnimalIcon = () => {
    switch(report.animalType) {
      case 'dog': return '🐕';
      case 'cat': return '🐈';
      default: return '🐾';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getAnimalIcon()}</span>
          <h3 className="text-lg font-semibold text-gray-800 capitalize">
            {report.animalType === 'dog' ? 'Perro' : report.animalType === 'cat' ? 'Gato' : 'Animal'} reportado
          </h3>
        </div>
        
        <p className="mt-2 text-gray-600">{report.description}</p>
        
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            {report.condition || 'Condición no especificada'}
          </span>
          <span className="ml-auto">
            {new Date(report.date).toLocaleString()}
          </span>
        </div>
      </div>
      
      {report.image && (
        <div className="bg-gray-100 p-2">
          <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-400">[Vista previa de imagen]</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;