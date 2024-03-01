import filterJapanese  from '../app/functions/filterJapanese';

describe('filterJapanese', () => {
  it('should remove non-Japanese characters from a mixed string', () => {
    const inputText = 'Hello こんにちは! How are you 今日？';
    const expectedOutput = 'こんにちは今日';

    const result = filterJapanese(inputText);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle an empty string', () => {
    const inputText = '';
    const expectedOutput = '';

    const result = filterJapanese(inputText);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle a string with no Japanese characters', () => {
    const inputText = 'Hello! How are you today?';
    const expectedOutput = '';

    const result = filterJapanese(inputText);

    expect(result).toEqual(expectedOutput);
  });

  // Add more test cases as needed
});
