const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
const themeToggle = document.getElementById('theme-toggle'); // If you have a toggle button

// Initial Theme Setup
function setupTheme() {
  if (prefersDarkMode.matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Theme Toggle Function
function toggleTheme() {
  document.body.classList.toggle('dark-mode');

  // Optional: Store the preference in localStorage for persistence
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
}

// Setup on Load & Toggle Button Event (if applicable)
setupTheme(); // Run initially to set the theme

themeToggle?.addEventListener('click', toggleTheme);

// Check for Saved Preferences (if applicable)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
} 
