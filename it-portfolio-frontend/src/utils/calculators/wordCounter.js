export const countWords = (text) => {
  return {
    words: text.trim().split(/\s+/).length,
    characters: text.length,
  };
};
