import React, { useState } from 'react';
import CameraCapture from './CameraCapture';

const ReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    animalType: 'dog',
    condition: '',
    description: ''
  });
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageCapture = (file) => {
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert('Debes tomar una foto del animal');
      return;
    }
    onSubmit({
      ...formData,
      image,
      location: { lat: 0, lng: 0 }, // Simulamos ubicación
      date: new Date().toISOString()
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Nuevo Reporte</h2>
        
        {/* Campos del formulario existentes... */}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto</label>
          {image ? (
            <div className="mt-2 relative">
              <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <span className="text-gray-500">Foto capturada</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCamera(true)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCamera(true)}
              className="mt-1 w-full py-10 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-sm font-medium text-gray-600 hover:border-indigo-500 hover:text-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="mt-2 block">Capturar foto</span>
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reportar Animal
        </button>
      </form>

      {showCamera && (
        <CameraCapture 
          onCapture={handleImageCapture} 
          onClose={() => setShowCamera(false)} 
        />
      )}
    </>
  );
};

export default ReportForm;

// DONE