const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event; // store events

  butInstall.classList.toggle('hidden', false); // remove 'hidden' class from button element
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) { // validate event
    return;
  }
  promptEvent.prompt(); // show prompt

  window.deferredPrompt = null; // reset deferredPrompt
  butInstall.classList.toggle('hidden', true); // add 'hidden' class to button element
});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null; // Clear prompt
});
