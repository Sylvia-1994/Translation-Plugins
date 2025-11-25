export enum Language {
  AUTO = 'Auto Detect',
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE = 'Chinese (Simplified)',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
  ITALIAN = 'Italian',
  PORTUGUESE = 'Portuguese',
  RUSSIAN = 'Russian',
  ARABIC = 'Arabic',
}

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string; // Optional, usually auto-detected
  context?: string; // Optional context (e.g., formal, casual)
}

export interface SelectionState {
  text: string;
  rect: DOMRect | null;
  isVisible: boolean;
}

export type TranslateMode = 'selection' | 'writing';