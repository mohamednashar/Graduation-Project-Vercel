
let intervalId = null;

const refreshToken = () => {
  // Replace with your actual token refreshing logic
  console.log('Refreshing token...');
};

const startTokenRefresh = () => {
  refreshToken(); // Initial token refresh

  // Set interval to refresh token every 2 minutes (120,000 milliseconds)
  intervalId = setInterval(refreshToken, 120000);
};

const stopTokenRefresh = () => {
  clearInterval(intervalId);
};

export { startTokenRefresh, stopTokenRefresh };