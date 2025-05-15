import React, { useState, useEffect, useRef } from 'react';

const MapView = ({ reports }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Coordenadas de Santiago de Veraguas
  const VERAGUAS_CENTER = [-81.3167, 8.1000];
  const DEFAULT_ZOOM = 14;

  useEffect(() => {
    if (!window.mapboxgl) {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js';
      script.onload = initializeMap;
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(script);
        document.head.removeChild(link);
      };
    } else {
      initializeMap();
    }

    async function initializeMap() {
      try {
        // En producción, obtén este token de tu backend
        const response = await fetch('/api/mapbox-token');
        const { token } = await response.json();
        
        window.mapboxgl.accessToken = token || 'sk.eyJ1IjoiY3JpczMwIiwiYSI6ImNtYXBsZ2FsNDBqZWoyanBxdXRvbWltbmUifQ.qdrj67LjTh_Ee6fH14Eufg';

        const newMap = new window.mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: VERAGUAS_CENTER,
          zoom: DEFAULT_ZOOM,
          pitch: 45,
          bearing: -10
        });

        newMap.addControl(new window.mapboxgl.NavigationControl());
        newMap.addControl(new window.mapboxgl.ScaleControl());
        
        newMap.addControl(new window.mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }));

        setMap(newMap);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    return () => {
      if (map) map.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || !window.mapboxgl) return;

    markers.forEach(marker => marker.remove());
    const newMarkers = [];

    reports.forEach(report => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = report.animalType === 'dog' ? '🐕' : '🐈';
      el.style.fontSize = '24px';
      el.style.zIndex = '10';

      const popup = new window.mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="w-64">
            <h3 class="font-bold text-lg">${report.animalType === 'dog' ? 'Perro' : 'Gato'} reportado</h3>
            <p class="text-sm mt-1">${report.condition}</p>
            <p class="text-xs text-gray-500 mt-2">${new Date(report.date).toLocaleString()}</p>
          </div>
        `);

      const marker = new window.mapboxgl.Marker(el)
        .setLngLat([report.location.lng, report.location.lat])
        .setPopup(popup)
        .addTo(map);

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    if (reports.length > 0) {
      const bounds = new window.mapboxgl.LngLatBounds();
      reports.forEach(report => bounds.extend([report.location.lng, report.location.lat]));
      map.fitBounds(bounds, { 
        padding: 100, 
        maxZoom: 15,
        duration: 2000 
      });
    }
  }, [map, reports]);

  return (
    <div className="h-full w-full bg-gray-100 rounded-xl overflow-hidden relative">
      <div ref={mapContainer} className="h-full w-full" />
      <div className="p-4 bg-white rounded-lg shadow-md m-4 absolute top-0 left-0 z-10">
        <h3 className="font-bold text-lg">Reportes activos: {reports.length}</h3>
      </div>
    </div>
  );
};

export default MapView;

// DONE
