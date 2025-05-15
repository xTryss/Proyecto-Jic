import React, { useState, useRef, useEffect } from 'react';

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setImage(imageDataUrl);
  };

  const retakePhoto = () => {
    setImage(null);
  };

  const confirmPhoto = () => {
    if (image) {
      fetch(image)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'animal-photo.jpg', { type: 'image/jpeg' });
          onCapture(file);
          onClose();
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Tomar foto del animal</h2>
          {error ? (
            <p className="text-red-500 mt-2">{error}</p>
          ) : image ? (
            <div className="mt-4">
              <img src={image} alt="Captura" className="w-full rounded-lg" />
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={retakePhoto}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Volver a tomar
                </button>
                <button
                  onClick={confirmPhoto}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Usar foto
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative mt-4" style={{ paddingBottom: '75%' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover bg-gray-200"
                />
              </div>
              <button
                onClick={captureImage}
                className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Tomar foto
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;