import React, { useState, useEffect } from 'react';
import { initialReports } from './mock/reports';
import { loadReports, saveReports } from './utils/storage';
import Navigation from './components/Navigation';
import MapView from './components/MapView';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';

const App = () => {
  const [activeView, setActiveView] = useState('map');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const savedReports = loadReports();
    setReports(savedReports.length > 0 ? savedReports : initialReports);
  }, []);

  const handleNewReport = (newReport) => {
    const updatedReports = [...reports, { ...newReport, id: Date.now() }];
    setReports(updatedReports);
    saveReports(updatedReports);
    setActiveView('map');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeView === 'map' && (
          <div className="h-[calc(100vh-200px)]">
            <MapView reports={reports} />
          </div>
        )}
        
        {activeView === 'new' && (
          <div className="max-w-md mx-auto">
            <ReportForm onSubmit={handleNewReport} />
          </div>
        )}
        
        {activeView === 'reports' && (
          <div className="px-4 py-6">
            <ReportList reports={reports} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

// DONE