export default function handler(req, res) {
  // En un entorno real, esto debería venir de variables de entorno
  const token = process.env.MAPBOX_PUBLIC_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2xvZ28zMWVvMDQ0eDJrcGRiZzU0bWl1biJ9.m4Vl4JzJZJZJZJZJZJZJZA';
  
  res.status(200).json({ token });
}

// DONE