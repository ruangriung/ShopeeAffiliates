import React from 'react';
import { Video } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const VideoAICard: React.FC<Props> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-blue-500 to-indigo-600 border border-transparent rounded-[4px] flex flex-col p-[6px] md:p-[8px] transition duration-200 hover:shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer text-white relative overflow-hidden h-full group"
    >
      <div className="absolute top-[-10px] right-[-10px] opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
        <Video className="w-20 h-20" />
      </div>
      
      <div className="w-full aspect-square relative bg-white/10 mb-[6px] rounded-[2px] flex flex-col items-center justify-center p-3 text-center border border-white/20">
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm mb-2">
          <Video className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <h3 className="font-bold text-[12px] md:text-[14px] leading-tight drop-shadow-sm line-clamp-2">Tren Video AI Saat Ini</h3>
      </div>
      
      <div className="text-[10px] md:text-[11px] leading-[1.3] overflow-hidden text-white/90 mb-auto mt-1 flex-1">
        Bikin video sinematik keren cuma modal teks! Cek informasinya di sini.
      </div>
      
      <div className="mt-[6px] bg-white text-indigo-600 font-bold text-[10px] md:text-[11px] py-[6px] px-[8px] rounded-[2px] text-center uppercase tracking-wider shadow-sm group-hover:bg-indigo-50 transition-colors">
        Lihat Detail
      </div>
    </div>
  );
};
