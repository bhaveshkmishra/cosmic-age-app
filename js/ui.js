// UI interaction functions

export function showError(message, errorMessageEl) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove('hidden');
  
  // Hide other elements when showing error
  document.getElementById('age-display').classList.add('hidden');
  document.getElementById('generate-milestones-btn').classList.add('hidden');
  document.getElementById('extra-actions').classList.add('hidden');
  document.getElementById('milestones-container').classList.add('hidden');
  document.getElementById('birthday-countdown').classList.add('hidden');
  document.getElementById('fun-facts-container').classList.add('hidden');
  
  // Clear intervals
  if (window.ageInterval) clearInterval(window.ageInterval);
  if (window.birthdayInterval) clearInterval(window.birthdayInterval);
}

export function hideError(errorMessageEl) {
  errorMessageEl.classList.add('hidden');
}

export function showAgeDisplay() {
  document.getElementById('age-display').classList.remove('hidden');
  document.getElementById('generate-milestones-btn').classList.remove('hidden');
  document.getElementById('extra-actions').classList.remove('hidden');
  
  // Hide other sections
  document.getElementById('milestones-container').classList.add('hidden');
  document.getElementById('birthday-countdown').classList.add('hidden');
  document.getElementById('fun-facts-container').classList.add('hidden');
}

export function showBirthdayCountdown() {
  document.getElementById('birthday-countdown').classList.remove('hidden');
  document.getElementById('fun-facts-container').classList.add('hidden');
  document.getElementById('milestones-container').classList.add('hidden');
}

export function showFunFacts() {
  document.getElementById('fun-facts-container').classList.remove('hidden');
  document.getElementById('birthday-countdown').classList.add('hidden');
  document.getElementById('milestones-container').classList.add('hidden');
}

export function showMilestones() {
  document.getElementById('milestones-container').classList.remove('hidden');
  document.getElementById('milestones-list').classList.add('hidden');
  document.getElementById('loader').classList.remove('hidden');
}

export function hideMilestonesLoader() {
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('milestones-list').classList.remove('hidden');
}

export function showSavedResults() {
  document.getElementById('saved-results').classList.remove('hidden');
}

export function hideSavedResults() {
  document.getElementById('saved-results').classList.add('hidden');
}

export function updateCurrentTime() {
  const now = new Date();
  document.getElementById('current-time').textContent = now.toLocaleTimeString();
}

export function updateAgeDisplay(age) {
  document.getElementById('years').textContent = age.years;
  document.getElementById('months').textContent = age.months;
  document.getElementById('days').textContent = age.days;
  document.getElementById('hours').textContent = age.hours;
  document.getElementById('minutes').textContent = age.minutes;
  document.getElementById('seconds').textContent = age.seconds;
}