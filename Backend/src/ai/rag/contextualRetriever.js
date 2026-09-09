import { retrieveContext } from './retriever.js';

export const contextualRetriever = async ({
  query,
  role,
}) => {
  const context = await retrieveContext(
    `${role} ${query}`
  );

  return context;
};