export const initializeMapbox = () => {
  if (!window.mapboxgl) {
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js';
    script.async = true;
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

// DONE