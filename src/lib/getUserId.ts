import { v4 as uuidv4 } from 'uuid';

export const getSessionId = (): string => {
  // check if in a browser
  if (typeof window === 'undefined') {
    return 'nobody';
  }

  let sessionId = sessionStorage.getItem('sessionId');

  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};
