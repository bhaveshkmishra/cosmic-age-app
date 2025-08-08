// Fun facts generation functions

export function generateFunFacts(birthDate, funFactsListEl) {
  const now = new Date();
  const ageInMs = now - birthDate;
  const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
  const ageInHours = Math.floor(ageInMs / (1000 * 60 * 60));
  const ageInMinutes = Math.floor(ageInMs / (1000 * 60));
  const ageInSeconds = Math.floor(ageInMs / 1000);
  const years = Math.floor(ageInDays / 365.25);
  
  const facts = [
    `🫀 Your heart has beaten approximately ${(years * 40000000).toLocaleString()} times!`,
    `👁️ You've blinked about ${(ageInDays * 17000).toLocaleString()} times!`,
    `🌍 You've traveled ${(years * 584000000).toLocaleString()} miles through space with Earth!`,
    `💨 You've taken roughly ${(ageInMinutes * 20).toLocaleString()} breaths!`,
    `🍕 If you ate pizza once a week, you've had about ${Math.floor(ageInDays / 7).toLocaleString()} slices!`,
    `☀️ You've experienced ${ageInDays.toLocaleString()} sunrises and sunsets!`,
    `🌙 The moon has orbited Earth ${Math.floor(ageInDays / 29.5).toLocaleString()} times since you were born!`,
    `⚡ Your neurons have fired trillions of times - approximately ${(ageInSeconds * 1000000).toLocaleString()} signals!`,
    `🦶 You've taken roughly ${(ageInDays * 7500).toLocaleString()} steps (assuming 7,500 steps/day)!`,
    `😴 You've probably slept for about ${Math.floor(ageInHours / 3).toLocaleString()} hours total!`
  ];
  
  funFactsListEl.innerHTML = facts.map(fact => `<p class="p-2 bg-gray-800 bg-opacity-30 rounded">${fact}</p>`).join('');
}