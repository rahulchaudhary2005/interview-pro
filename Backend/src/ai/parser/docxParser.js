import mammoth from 'mammoth';

export const parseDOCX = async (path) => {
  const result = await mammoth.extractRawText({
    path,
  });

  return result.value;
};