import React from 'react';
import { ArrowLeft, Video, Film, Wand2, PlayCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { videoAIMarkdown } from '../config';

interface Props {
  onBack: () => void;
}

export const VideoAIPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="w-full max-w-[1024px] mx-auto p-4 animate-fade-in-up">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#ee4d2d] hover:bg-[#ee4d2d]/10 px-4 py-2 rounded-[4px] font-bold mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali ke Beranda</span>
      </button>

      <div className="bg-white rounded-[8px] p-6 md:p-10 shadow-sm border border-[#e8e8e8]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-full text-white">
            <Video className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#222]">
            Dunia Video AI
          </h1>
        </div>

        <div className="prose prose-blue max-w-none prose-pre:bg-[#282c34] prose-pre:text-green-400">
          <Markdown>{videoAIMarkdown}</Markdown>
        </div>
      </div>
    </div>
  );
};
