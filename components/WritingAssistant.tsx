import React, { useState, useRef } from 'react';
import { translateText } from '../services/geminiService';
import { Language } from '../types';
import { IconWand, IconArrowRight } from './Icons';

interface WritingAssistantProps {
  targetLanguage: Language;
  placeholder?: string;
  label: string;
}

export const WritingAssistant: React.FC<WritingAssistantProps> = ({ targetLanguage, placeholder, label }) => {
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    setShowPreview(true);
    
    const result = await translateText(inputText, targetLanguage, 'professional and natural');
    
    setTranslatedText(result);
    setIsTranslating(false);
  };

  const applyTranslation = () => {
    setInputText(translatedText);
    setShowPreview(false);
    setTranslatedText('');
  };

  const cancelTranslation = () => {
    setShowPreview(false);
    setTranslatedText('');
  };

  return (
    <div className="relative group w-full mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full p-4 pr-12 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors resize-none bg-white"
        />
        
        {/* Magic Wand Trigger */}
        {inputText && !showPreview && (
          <button
            onClick={handleTranslate}
            className="absolute right-3 bottom-3 p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
            title={`Translate to ${targetLanguage}`}
          >
            <IconWand className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Translation Preview Overlay / Panel */}
      {showPreview && (
        <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                        Draft ({targetLanguage})
                    </h4>
                    {isTranslating ? (
                         <div className="flex space-x-1 items-center h-6">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                         </div>
                    ) : (
                        <p className="text-gray-800 text-sm leading-relaxed">{translatedText}</p>
                    )}
                </div>
            </div>
            
            {!isTranslating && (
                <div className="flex justify-end space-x-3 mt-3">
                    <button 
                        onClick={cancelTranslation}
                        className="text-xs text-gray-500 hover:text-gray-800 font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={applyTranslation}
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 rounded-md shadow-sm transition-colors flex items-center"
                    >
                        <span>Replace Text</span>
                        <IconArrowRight className="w-3 h-3 ml-1" />
                    </button>
                </div>
            )}
        </div>
      )}
    </div>
  );
};
