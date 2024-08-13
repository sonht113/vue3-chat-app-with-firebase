const sessionStorageUtils = {
  set: (key: string, value: any) => {
    return sessionStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    try {
      return JSON.parse(sessionStorage.getItem(key) as string);
    } catch (error) {
      return null;
    }
  },
  remove: (key: string) => {
    return sessionStorage.removeItem(key);
  },
  clear: () => {
    return sessionStorage.clear();
  },
};

export default sessionStorageUtils;
