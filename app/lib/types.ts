interface GeneratedText {
    meaning: string;
    romaji: string;
    furigana: string;
    context: string;
    words: { [key: string]: { 
      word: string, 
      romaji: string, 
      category: string, 
      meaning: string, 
      context: string
    } 
  };
  }
  
  interface JsonResponse{
    status: string;
    body: GeneratedText;
  }
  