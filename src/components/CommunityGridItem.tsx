import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Props {
  joinLink: string;
}

export const CommunityGridItem: React.FC<Props> = ({ joinLink }) => {
  return (
    <div className="col-span-3 md:col-span-7 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-[2px] p-[16px] text-white shadow-sm my-[4px] relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
      <div className="absolute left-[-20px] bottom-[-20px] opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.48 15.86 14.21 15.53 15.93C15.39 16.65 15.13 16.89 14.88 16.91C14.33 16.96 13.91 16.55 13.38 16.2C12.55 15.65 12.08 15.31 11.27 14.78C10.33 14.16 10.94 13.82 11.47 13.27C11.61 13.13 14.07 10.89 14.11 10.7C14.12 10.68 14.12 10.61 14.08 10.58C14.04 10.54 13.98 10.56 13.94 10.57C13.87 10.58 12.65 11.39 10.28 12.99C9.93 13.23 9.62 13.34 9.34 13.34C9.03 13.33 8.44 13.17 7.99 13.02C7.42 12.83 6.98 12.73 7.02 12.41C7.04 12.24 7.27 12.07 7.7 11.88C11.69 10.14 14.35 9.03 15.68 8.48C16.96 7.95 17.23 7.86 17.41 7.86C17.45 7.86 17.55 7.87 17.62 7.92C17.67 7.97 17.7 8.04 17.7 8.12C17.69 8.24 17.66 8.45 16.64 8.8Z" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[12px]">
        <div className="flex-1">
          <h2 className="text-[15px] md:text-[18px] font-bold mb-[6px] flex items-center gap-[6px] drop-shadow-sm">
            <span className="text-[18px] md:text-[22px]">💬</span> Gabung Grup Diskon Rahasia!
          </h2>
          <p className="text-[12px] md:text-[13px] text-white/90 leading-relaxed max-w-2xl">
            Jangan sampai ketinggalan flash sale! Gabung grup Telegram kami untuk mendapatkan info diskon belanja meronta-ronta, kode voucher rahasia, dan giveaway setiap bulannya.
          </p>
        </div>
        
        <a 
          href={joinLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-[16px] py-[10px] rounded-[2px] text-[12px] font-bold transition-all duration-300 w-full md:w-auto uppercase shadow-sm bg-white text-teal-600 hover:bg-gray-100 hover:shadow-md flex items-center justify-center gap-[6px] shrink-0"
        >
          <MessageCircle className="w-[14px] h-[14px]" />
          <span>Join Channel</span>
        </a>
      </div>
    </div>
  );
};
