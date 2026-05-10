import React from 'react';
import { BookOpen } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const BlogCard: React.FC<Props> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-orange-400 to-rose-400 border border-transparent rounded-[4px] flex flex-col p-[6px] md:p-[8px] transition duration-200 hover:shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer text-white relative overflow-hidden h-full group"
    >
      <div className="absolute bottom-[-10px] right-[-10px] opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
        <BookOpen className="w-20 h-20" />
      </div>
      
      <div className="w-full aspect-square relative bg-white/10 mb-[6px] rounded-[2px] flex flex-col items-center justify-center p-3 text-center border border-white/20">
        <div className="bg-white text-orange-500 text-[9px] font-bold px-2 py-1 rounded-[2px] w-fit mb-2 uppercase tracking-wide shadow-sm">Blog Terbaru</div>
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm mb-2">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-[11px] md:text-[13px] leading-tight drop-shadow-sm line-clamp-3">Review Gadget Kekinian Anti Boncos!</h3>
      </div>
      
      <div className="text-[10px] md:text-[11px] leading-[1.3] overflow-hidden text-white/90 mb-auto mt-1 flex-1">
        Rekomendasi gadget ramah kantong spesifikasi dewa untuk tahun ini.
      </div>
      
      <div className="mt-[6px] border border-white/50 text-white font-bold text-[10px] md:text-[11px] py-[6px] px-[8px] rounded-[2px] text-center uppercase tracking-wider group-hover:bg-white/20 transition-colors">
        Baca Artikel
      </div>
    </div>
  );
};
