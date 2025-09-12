const generateAlphabet = () => {
  const letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  return letters;
};

export const ALPHABET = generateAlphabet();

export const MAXPLAYERSANDWORDS = [1, 2, 3, 4, 5]

export const MAXERRORS = 5

export const MAXPOINTS = 50
export const PENALTY = 5

export const score = (errors) => {
  if(errors === MAXERRORS) {
    return 0 - (PENALTY * errors)
  }
  else {
    return MAXPOINTS - (PENALTY * errors)
  }
}