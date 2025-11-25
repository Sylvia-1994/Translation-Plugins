import React, { useState } from 'react';
import { SelectionTranslator } from './components/SelectionTranslator';
import { WritingAssistant } from './components/WritingAssistant';
import { Language } from './types';
import { IconTranslate } from './components/Icons';

export default function App() {
  const [targetLanguage, setTargetLanguage] = useState<Language>(Language.SPANISH);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 relative">
      
      {/* 1. Global Plugin Component: Selection Translator */}
      {/* This component watches for text selection anywhere in the app */}
      <SelectionTranslator targetLanguage={targetLanguage} />

      {/* Header / Plugin Control Panel */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
              <IconTranslate className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 tracking-tight">LinguaFlow</h1>
              <p className="text-xs text-gray-500 font-medium">Browser Extension Simulator</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <span className="text-xs font-semibold text-gray-500">Translate to:</span>
                <select 
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value as Language)}
                    className="bg-transparent text-sm font-medium text-indigo-700 focus:outline-none cursor-pointer"
                >
                    {Object.values(Language).filter(l => l !== Language.AUTO).map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Simulating a Web Page */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        
        {/* Intro Card */}
        <div className="bg-indigo-600 rounded-2xl p-8 mb-12 text-white shadow-xl shadow-indigo-200">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Translation Playground</h2>
            <p className="text-indigo-100 mb-6 leading-relaxed">
                This app demonstrates a browser plugin experience. 
                <br />
                <strong className="text-white border-b border-indigo-400 pb-0.5">Feature 1:</strong> Select any text in the article below to see the "Selection Translator" popup.
                <br />
                <strong className="text-white border-b border-indigo-400 pb-0.5">Feature 2:</strong> Type in the input box below and use the "Magic Wand" to translate while you write.
            </p>
        </div>

        {/* Simulated Article Content */}
        <article className="prose prose-slate lg:prose-lg max-w-none mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">The Future of Digital Communication</h3>
            <p className="mb-4 text-gray-600 leading-7">
                As artificial intelligence continues to evolve, the barriers between languages are rapidly dismantling. 
                Real-time translation tools are becoming increasingly sophisticated, moving beyond simple word-for-word substitution to understanding context, idiom, and cultural nuance.
            </p>
            <p className="mb-4 text-gray-600 leading-7">
                Imagine a world where you can visit any website, regardless of its origin language, and read it as if it were written natively for you. 
                Furthermore, imagine communicating with colleagues across the globe, typing in your native tongue, while they receive your message perfectly localized in theirs.
            </p>
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 my-6 bg-gray-100 p-4 rounded-r-lg">
                "Language is the road map of a culture. It tells you where its people come from and where they are going." 
                <footer className="text-sm font-bold mt-2 not-italic">- Rita Mae Brown</footer>
            </blockquote>
            <p className="mb-4 text-gray-600 leading-7">
                Technological advancements in Neural Machine Translation (NMT) and Large Language Models (LLMs) like Gemini are paving the way for this future. 
                Latency is decreasing, and accuracy is increasing, making cross-cultural collaboration seamless and efficient.
            </p>
        </article>

        <hr className="border-gray-200 mb-12" />

        {/* Input Assistant Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-2 mb-6">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <IconTranslate className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Writing Assistant</h3>
            </div>
            
            <p className="text-gray-500 mb-6 text-sm">
                Try typing an email response below in English, then click the magic wand inside the input box to convert it to {targetLanguage}.
            </p>

            <WritingAssistant 
                label="Email Reply"
                placeholder="Type here (e.g., 'Hi team, I reviewed the document and it looks great. Let's proceed with the launch.')"
                targetLanguage={targetLanguage}
            />

            <WritingAssistant 
                label="Quick Comment"
                placeholder="Type a comment..."
                targetLanguage={targetLanguage}
            />
        </div>

      </main>
    </div>
  );
}
