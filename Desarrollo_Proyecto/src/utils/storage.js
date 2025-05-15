export const saveReports = (reports) => {
  localStorage.setItem('animalReports', JSON.stringify(reports));
};

export const loadReports = () => {
  const saved = localStorage.getItem('animalReports');
  return saved ? JSON.parse(saved) : [];
};