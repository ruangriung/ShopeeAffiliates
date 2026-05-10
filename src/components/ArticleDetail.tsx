import React from 'react';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import { Article } from '../types';

interface Props {
  article: Article;
  onBack: () => void;
}

export const ArticleDetail: React.FC<Props> = ({ article, onBack }) => {
  return (
    <div className="w-full p-4 animate-fade-in-up">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#ee4d2d] hover:bg-[#ee4d2d]/10 px-4 py-2 rounded-[4px] font-bold mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </button>

      <div className="bg-white rounded-[12px] overflow-hidden shadow-sm border border-[#e8e8e8]">
         {/* Hero Header */}
         <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 md:p-12 text-white relative flex flex-col items-center text-center">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen className="w-24 h-24 rotate-12" />
           </div>
           
           <div className="z-10 w-full max-w-3xl">
             <div className="flex items-center justify-center gap-4 mb-4 text-sm font-medium">
               <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                 <Tag className="w-3 h-3" /> {article.tag || 'Artikel'}
               </span>
               {article.date && (
                 <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                   <Clock className="w-3 h-3" /> {article.date}
                 </span>
               )}
             </div>
             <h1 className="text-2xl md:text-5xl font-bold text-white drop-shadow-md leading-tight mb-4">
               {article.title}
             </h1>
           </div>
        </div>

        <div className="p-6 md:p-12 max-w-4xl mx-auto text-[#444]">
          <div className="prose prose-orange lg:prose-lg max-w-none">
            <Markdown remarkPlugins={[remarkGfm, remarkSmartypants]}>{article.content}</Markdown>
          </div>
          
          <hr className="my-10 border-[#e8e8e8]" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#fff9f8] p-6 rounded-[8px] border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#222]">Admin Affiliate</p>
                <p className="text-[12px] text-[#757575]">Konten Kreator & Tech Enthusiast</p>
              </div>
            </div>
            <button 
              onClick={onBack}
              className="w-full md:w-auto bg-[#ee4d2d] text-white px-6 py-2.5 rounded-[4px] font-bold hover:bg-[#d74326] transition-colors"
            >
              Lihat Produk Lainnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
