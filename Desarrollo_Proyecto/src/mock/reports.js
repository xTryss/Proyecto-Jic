export const initialReports = [
  {
    id: 1,
    animalType: 'dog',
    condition: 'Herida en pata',
    description: 'Perro callejero con herida en pata delantera derecha, cojeando.',
    date: new Date().toISOString(),
    location: { lat: 8.1020, lng: -81.3150 } // Coordenadas cerca de Santiago de Veraguas
  },
  {
    id: 2,
    animalType: 'cat',
    condition: 'Deshidratación',
    description: 'Gato atrapado en árbol, parece deshidratado.',
    date: new Date().toISOString(),
    location: { lat: 8.0980, lng: -81.3200 } // Otras coordenadas cercanas
  }
];

// DONE