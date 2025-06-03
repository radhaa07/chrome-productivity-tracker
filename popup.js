// Display productivity stats fetched from storage or backend
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['timeData'], (result) => {
    document.getElementById('stats').textContent = JSON.stringify(result.timeData, null, 2) || "No data yet";
  });
});
