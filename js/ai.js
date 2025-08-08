// AI integration functions

export async function generateMilestones(age, milestonesListEl, loaderEl) {
  try {
    // Show loader
    loaderEl.classList.remove('hidden');
    milestonesListEl.classList.add('hidden');

    // In a production app, this would call your secure backend endpoint
    // For this example, we'll simulate the API call with a timeout
    const prompt = `A person is ${age.years} years, ${age.months} months, and ${age.days} days old. Generate a short, fun, and inspiring list of 3-4 cosmic or interesting real-world milestones they have passed in their lifetime. Format each milestone as a separate paragraph. Be creative and use a space/cosmic theme. Examples: "You've orbited the sun X times!", "Your heart has beaten over Y billion times.", "You've traveled millions of miles with Earth around the galaxy."`;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Fallback content (in a real app, this would come from the API)
    const fallbackContent = `<p class="text-red-400">🤖 Gemini AI is currently unavailable. Here are some cosmic facts:</p>
    <p>🌍 You've traveled over ${(parseInt(age.years) * 584000000).toLocaleString()} miles through space with Earth!</p>
    <p>💓 Your heart has beaten approximately ${(parseInt(age.years) * 37000000).toLocaleString()} times!</p>
    <p>🌅 You've experienced about ${(parseInt(age.years) * 365).toLocaleString()} sunrises and sunsets!</p>
    <p>🌙 You've seen the moon complete ${(parseInt(age.years) * 12).toLocaleString()} cycles around Earth!</p>`;

    milestonesListEl.innerHTML = fallbackContent;
  } catch (error) {
    console.error("Milestones generation failed:", error);
    milestonesListEl.innerHTML = `<p class="text-red-400">Failed to generate milestones. ${error.message}</p>`;
  } finally {
    loaderEl.classList.add('hidden');
    milestonesListEl.classList.remove('hidden');
  }
}