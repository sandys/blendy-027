export const logToServer = (message: string, data?: any, level: 'info' | 'warn' | 'error' = 'info') => {
  if (typeof window === 'undefined') return; // Don't run on server
  
  fetch('/api/debug/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, data, level }),
    keepalive: true,
  }).catch(() => {});
};
