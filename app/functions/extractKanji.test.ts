import extractKanji from './extractKanji'; // Replace with the actual filename

describe('extractKanji', () => {
  it('should extract kanji from a mixed string', () => {
    const inputText = '漢字の意味は何ですか';
    const expectedOutput = {
      1: '漢字 - meaning',
      2: '意味 - meaning',
      3: '何 - meaning',
    };

    const result = extractKanji(inputText);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle an empty string', () => {
    const inputText = '';
    const expectedOutput = {};

    const result = extractKanji(inputText);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle consecutive kanji characters', () => {
    const inputText = '漢字意味';
    const expectedOutput = {
      1: '漢字意味 - meaning',
    };

    const result = extractKanji(inputText);

    expect(result).toEqual(expectedOutput);
  });

  // Add more test cases as needed
});
