// Storage functions for localStorage operations

export function saveResults(results) {
  localStorage.setItem('cosmicAgeResults', JSON.stringify(results));
}

export function loadResults() {
  return JSON.parse(localStorage.getItem('cosmicAgeResults') || '[]');
}

export function clearResults() {
  localStorage.removeItem('cosmicAgeResults');
}

export function saveProjects(projects) {
  localStorage.setItem('cosmicProjects', JSON.stringify(projects));
}

export function loadProjects() {
  try {
    return JSON.parse(localStorage.getItem('cosmicProjects') || '[]');
  } catch {
    return [];
  }
}

export function clearProjects() {
  localStorage.removeItem('cosmicProjects');
}