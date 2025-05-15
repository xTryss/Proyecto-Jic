import React from 'react';

const Navigation = ({ activeView, setActiveView }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">PawProtect</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveView('map')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${activeView === 'map' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Mapa
            </button>
            <button
              onClick={() => setActiveView('reports')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${activeView === 'reports' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Mis Reportes
            </button>
            <button
              onClick={() => setActiveView('new')}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Nuevo Reporte
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;