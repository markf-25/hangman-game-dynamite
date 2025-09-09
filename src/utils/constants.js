const generateAlphabet = () => {
  const letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  return letters;
};

export const ALPHABET = generateAlphabet();

export const SELECTPLAYERS = [1, 2, 3, 4, 5]

export const MAXERRORS = 5