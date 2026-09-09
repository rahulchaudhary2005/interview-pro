const sessionMemory = new Map();

export const saveSession = (id, data) => {
  sessionMemory.set(id, data);
};

export const getSession = (id) => {
  return sessionMemory.get(id);
};