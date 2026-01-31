export function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('localStorage setItem error:', e);
  }
}

export function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('localStorage getItem error:', e);
    return null;
  }
}

export function removeItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('localStorage removeItem error:', e);
  }
}
