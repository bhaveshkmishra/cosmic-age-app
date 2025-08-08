// Utility functions for date calculations and formatting

export function calculateAge(birthDate, now = new Date()) {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  let hours = now.getHours() - birthDate.getHours();
  let minutes = now.getMinutes() - birthDate.getMinutes();
  let seconds = now.getSeconds() - birthDate.getSeconds();
  
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
  }
  if (months < 0) { months += 12; years--; }
  
  return { years, months, days, hours, minutes, seconds };
}

export function calculateAgeBetween(birthDate, atDate) {
  if (!birthDate || !atDate) return null;
  let years = atDate.getFullYear() - birthDate.getFullYear();
  let months = atDate.getMonth() - birthDate.getMonth();
  let days = atDate.getDate() - birthDate.getDate();
  if (days < 0) {
      const lastMonth = new Date(atDate.getFullYear(), atDate.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
  }
  if (months < 0) {
      months += 12;
      years--;
  }
  return { years, months, days };
}

export function addDurationToDate(start, y = 0, m = 0, d = 0) {
  const end = new Date(start.getTime());
  if (y) end.setFullYear(end.getFullYear() + Number(y));
  if (m) end.setMonth(end.getMonth() + Number(m));
  if (d) end.setDate(end.getDate() + Number(d));
  return end;
}

export function formatDHMS(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function percentProgress(start, end, now) {
  const total = end - start;
  if (total <= 0) return 100;
  const elapsed = now - start;
  return Math.max(0, Math.min(100, Math.round((elapsed / total) * 100)));
}

export function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>\"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
  }[c]));
}

export function cryptoRandomId() {
  // Fallback if crypto not available
  if (window.crypto?.getRandomValues) {
    const arr = new Uint32Array(4);
    window.crypto.getRandomValues(arr);
    return Array.from(arr).map(n => n.toString(16)).join('');
  }
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}