export default function filterJapanese(japaneseText: string): string {
    // Regular expression to match Japanese characters (including hiragana, katakana, and kanji)
    const japaneseRegex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆〤]+/gu;

    // Extract Japanese characters using the regex
    const japaneseCharacters = japaneseText.match(japaneseRegex);

    // Join the matched Japanese characters into a single string
    const result = japaneseCharacters ? japaneseCharacters.join('') : '';

    return result;
}