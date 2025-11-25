import React, { useState, useEffect, useRef } from 'react';
import { translateText } from '../services/geminiService';
import { SelectionState, Language } from '../types';
import { IconTranslate, IconCopy, IconX, IconCheck } from './Icons';

interface SelectionTranslatorProps {
  targetLanguage: Language;
}

export const SelectionTranslator: React.FC<SelectionTranslatorProps> = ({ targetLanguage }) => {
  const [selection, setSelection] = useState<SelectionState>({ text: '', rect: null, isVisible: false });
  const [translation, setTranslation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Use a ref to track the popup element to prevent closing when clicking inside it
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selectedText = window.getSelection()?.toString().trim();

      if (!selectedText) {
        // Only hide if we aren't clicking inside our own popup
        return;
      }

      const range = window.getSelection()?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();

      if (rect) {
        // Don't show immediately, wait for mouseup usually, but for this demo instant capture is tricky
        // Logic moved to handleMouseUp for better UX
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      // If clicking inside the popup, do nothing
      if (popupRef.current && popupRef.current.contains(e.target as Node)) {
        return;
      }

      const winSelection = window.getSelection();
      const selectedText = winSelection?.toString().trim();

      if (selectedText && selectedText.length > 0) {
        const range = winSelection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        
        if (rect) {
          setSelection({
            text: selectedText,
            rect: rect,
            isVisible: true
          });
          // Reset previous state
          setTranslation(''); 
          setLoading(false);
          setCopied(false);
        }
      } else {
        setSelection(prev => ({ ...prev, isVisible: false }));
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    // document.addEventListener('selectionchange', handleSelectionChange); // Optional: creates too much noise

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      // document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handleTranslate = async () => {
    setLoading(true);
    const result = await translateText(selection.text, targetLanguage);
    setTranslation(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closePopup = () => {
      setSelection(prev => ({...prev, isVisible: false}));
      window.getSelection()?.removeAllRanges();
  };

  if (!selection.isVisible || !selection.rect) return null;

  // Calculate position: Centered above the selection
  // Add window scroll offset because getBoundingClientRect is relative to viewport
  const top = selection.rect.top + window.scrollY - 10; 
  const left = selection.rect.left + (selection.rect.width / 2) + window.scrollX;

  return (
    <div 
      ref={popupRef}
      className="absolute z-50 flex flex-col items-center animate-in fade-in zoom-in-95 duration-200"
      style={{ 
        top: `${top}px`, 
        left: `${left}px`,
        transform: 'translate(-50%, -100%)' 
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-80 max-w-[90vw] text-left relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
                <div className="bg-indigo-100 p-1.5 rounded-md text-indigo-600">
                    <IconTranslate className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {translation ? 'Translation' : 'Detected Text'}
                </span>
            </div>
            <button onClick={closePopup} className="text-gray-400 hover:text-gray-600">
                <IconX className="w-4 h-4" />
            </button>
        </div>

        {/* Content */}
        {!translation && !loading && (
             <div className="space-y-3">
                 <p className="text-sm text-gray-700 line-clamp-3 italic">"{selection.text}"</p>
                 <button 
                    onClick={handleTranslate}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                 >
                    <span>Translate to {targetLanguage}</span>
                 </button>
             </div>
        )}

        {loading && (
            <div className="py-4 flex flex-col items-center justify-center space-y-2">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-indigo-600 font-medium">Translating...</span>
            </div>
        )}

        {translation && (
            <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
                <div className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-100">
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">
                        {translation}
                    </p>
                </div>
                <div className="flex justify-end">
                    <button 
                        onClick={handleCopy}
                        className="flex items-center space-x-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                        {copied ? <IconCheck className="w-3 h-3" /> : <IconCopy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </div>
        )}
        
        {/* Decorative Triangle */}
        <div className="selection-popup-triangle"></div>
      </div>
    </div>
  );
};
