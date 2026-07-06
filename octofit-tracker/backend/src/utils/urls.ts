/**
 * Get the API base URL based on environment
 * Supports GitHub Codespaces with CODESPACE_NAME environment variable
 */
export const getApiBaseUrl = (): string => {
  const codspaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || 8000;

  if (codspaceName) {
    // Running in GitHub Codespaces
    return `https://${codspaceName}-${port}.app.github.dev`;
  }

  // Running locally
  const host = process.env.HOST || 'localhost';
  return `http://${host}:${port}`;
};

/**
 * Get the frontend URL based on environment
 * Supports GitHub Codespaces with CODESPACE_NAME environment variable
 */
export const getFrontendUrl = (): string => {
  const codspaceName = process.env.CODESPACE_NAME;
  const frontendPort = process.env.FRONTEND_PORT || 5173;

  if (codspaceName) {
    // Running in GitHub Codespaces
    return `https://${codspaceName}-${frontendPort}.app.github.dev`;
  }

  // Running locally
  const host = process.env.HOST || 'localhost';
  return `http://${host}:${frontendPort}`;
};

export default { getApiBaseUrl, getFrontendUrl };
