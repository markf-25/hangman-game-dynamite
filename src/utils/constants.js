const generateAlphabet = () => {
  const letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  return letters;
};

export const ALPHABET = generateAlphabet();

const generateNonAlphabetChars = () => {
  const chars = [];
  // Tutti i caratteri ASCII stampabili (32-126)
  for (let i = 32; i <= 126; i++) {
    const char = String.fromCharCode(i);
    if (!ALPHABET.includes(char)) {
      chars.push(char);
    }
  }
  return chars;
};

export const UNREQUIRED_CHARS = generateNonAlphabetChars();

export const COLORS = [
  "#FFA3A3", // rosso pastello
  "#FFF5A3", // giallo pastello
  "#A3C4FF", // blu pastello
  "#A3FFC9", // verde pastello
  "#D3A3FF"  // violetto pastello
]

export const MAXUSERNAMELENGTH = 10

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