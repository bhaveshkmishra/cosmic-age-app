// Project planner functions

import { calculateAgeBetween, addDurationToDate, formatDHMS, percentProgress, escapeHtml } from './utils.js';
import { saveProjects } from './storage.js';

export function renderProjects(projects, projectsListEl, projectsEmptyEl, currentBirthDate) {
  projectsListEl.innerHTML = '';
  if (!projects || projects.length === 0) {
    projectsEmptyEl.classList.remove('hidden');
  } else {
    projectsEmptyEl.classList.add('hidden');
  }

  const now = new Date();
  projects.forEach((p, idx) => {
    const start = new Date(p.startDate);
    const end = new Date(p.endDate);
    const beforeStart = now < start;
    const done = p.completed || now >= end;
    const timeLeft = done ? 0 : (beforeStart ? (start - now) : (end - now));
    const t = formatDHMS(timeLeft);
    const progress = done ? 100 : (beforeStart ? 0 : percentProgress(start, end, now));
    const ageAtCompletion = currentBirthDate ? calculateAgeBetween(currentBirthDate, end) : null;

    const container = document.createElement('div');
    container.className = 'p-4 rounded-lg bg-gray-800 bg-opacity-40 border border-gray-700';
    container.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="font-semibold text-lg ${done ? 'line-through text-gray-400' : ''}">${escapeHtml(p.name)}</div>
          <div class="text-xs text-gray-400">Start: ${new Date(p.startDate).toLocaleString()} • End: ${new Date(p.endDate).toLocaleString()}</div>
          ${ageAtCompletion ? `<div class="text-sm text-gray-300">Age at completion: <span class="font-semibold">${ageAtCompletion.years}y ${ageAtCompletion.months}m ${ageAtCompletion.days}d</span></div>` : `<div class="text-sm text-amber-300">Set your birth date above to see your age at completion.</div>`}
        </div>
        <div class="flex gap-2">
          <button data-action="complete" data-index="${idx}" class="text-xs bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded ${done ? 'opacity-50 cursor-not-allowed' : ''}">${done ? 'Completed' : 'Mark Complete'}</button>
          <button data-action="delete" data-index="${idx}" class="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
        </div>
      </div>
      <div class="mt-3">
        <div class="h-2 w-full bg-gray-700 rounded">
          <div class="h-2 bg-blue-600 rounded" style="width: ${progress}%;"></div>
        </div>
        <div class="text-xs text-gray-300 mt-1">
          ${beforeStart ? `Starts in: <span data-role="countdown" data-index="${idx}">${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s</span>` : (done ? 'Done' : `Time left: <span data-role="countdown" data-index="${idx}">${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s</span>`)} • Progress: <span data-role="progress" data-index="${idx}">${progress}%</span>
        </div>
      </div>
    `;
    projectsListEl.appendChild(container);
  });
}

export function updateProjectLive(projects, projectsListEl) {
  const now = new Date();
  projects.forEach((p, idx) => {
    const start = new Date(p.startDate);
    const end = new Date(p.endDate);
    const beforeStart = now < start;
    const done = p.completed || now >= end;
    const timeLeft = done ? 0 : (beforeStart ? (start - now) : (end - now));
    const t = formatDHMS(timeLeft);
    const progress = done ? 100 : (beforeStart ? 0 : percentProgress(start, end, now));
    // Update DOM
    const cd = projectsListEl.querySelector(`span[data-role="countdown"][data-index="${idx}"]`);
    const pr = projectsListEl.querySelector(`span[data-role="progress"][data-index="${idx}"]`);
    const bar = projectsListEl.querySelectorAll('.h-2.bg-blue-600')[idx];
    if (cd) cd.textContent = `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s`;
    if (pr) pr.textContent = `${progress}%`;
    if (bar) bar.style.width = `${progress}%`;
  });
}

export function initProjectStartDateDefault(projectStartDateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  projectStartDateInput.value = `${yyyy}-${mm}-${dd}`;
}