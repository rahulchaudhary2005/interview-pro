const chats = new Map();

export const saveChat = (userId, message) => {
  if (!chats.has(userId)) {
    chats.set(userId, []);
  }

  chats.get(userId).push(message);
};

export const getChats = (userId) => {
  return chats.get(userId) || [];
};