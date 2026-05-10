import React from 'react';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';
import Markdown from 'react-markdown';
import { blogMarkdown } from '../config';

interface Props {
  onBack: () => void;
}

export const BlogPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="w-full max-w-[1024px] mx-auto p-4 animate-fade-in-up">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#ee4d2d] hover:bg-[#ee4d2d]/10 px-4 py-2 rounded-[4px] font-bold mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali ke Beranda</span>
      </button>

      <div className="bg-white rounded-[8px] overflow-hidden shadow-sm border border-[#e8e8e8]">
        <div className="w-full h-[250px] md:h-[400px] bg-gradient-to-r from-orange-400 to-rose-400 relative flex items-center justify-center">
           <BookOpen className="w-24 h-24 text-white/30 absolute" />
           <div className="absolute bottom-6 left-6 right-6">
             <div className="flex gap-2 mb-3">
               <span className="bg-white text-orange-500 font-bold text-[11px] px-2 py-1 rounded-[2px] uppercase">Gadget</span>
               <span className="bg-black/30 text-white font-medium text-[11px] px-2 py-1 rounded-[2px] backdrop-blur-sm flex items-center gap-1">
                 <Clock className="w-3 h-3" /> 5 Min Read
               </span>
             </div>
             <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md leading-tight">
               Blog & Artikel
             </h1>
           </div>
        </div>

        <div className="p-6 md:p-10 max-w-none text-[#444]">
          <div className="prose prose-orange prose-pre:bg-[#282c34] prose-pre:text-green-400">
            <Markdown>{blogMarkdown}</Markdown>
          </div>
          
          <hr className="my-8 border-[#e8e8e8]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#757575] text-[14px]">
              <Tag className="w-4 h-4" />
              <span>Teknologi, Belanja Hemat, Review</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link artikel disalin!");
              }}
              className="bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#555] font-bold px-4 py-2 rounded-[4px] text-[13px] transition-colors"
            >
              Share Artikel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
