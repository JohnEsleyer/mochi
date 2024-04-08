export default function removeCodeBlock(input: string): string {
    const pattern = /^```json\s*([\s\S]*)\s*```$/;
    const match = pattern.exec(input);
    if (match && match.length >= 2) {
      return match[1];
    }
    return input;
  }