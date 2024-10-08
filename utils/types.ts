interface GeneratedText {
    meaning: string;
    romaji: string;
    furigana: string;
    context: string;
    words: { [key: string]: { 
      word: string, 
      romaji: string, 
      class: string, 
      meaning: string, 
      context: string
    } 
  };
  }
  
  interface AnalyzerResponse{
    status: number;
    body: GeneratedText;
  }
  
  interface Conversation{
    conversation: string[],
}