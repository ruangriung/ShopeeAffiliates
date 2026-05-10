import React from 'react';
import { Lightbulb, Gift } from 'lucide-react';

interface Props {
  tutorialLink: string;
}

export const TipGridItem: React.FC<Props> = ({ tutorialLink }) => {
  return (
    <div className="col-span-3 md:col-span-7 bg-gradient-to-r from-amber-500 to-orange-400 rounded-[2px] p-[16px] text-white shadow-sm my-[4px] relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
      <div className="absolute left-[-20px] bottom-[-20px] opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.43 4 16.05 4 12C4 7.95 7.05 4.57 11 4.07V19.93ZM13 4.07C16.95 4.57 20 7.95 20 12C20 16.05 16.95 19.43 13 19.93V4.07Z" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[12px]">
        <div className="flex-1">
          <h2 className="text-[15px] md:text-[18px] font-bold mb-[6px] flex items-center gap-[6px] drop-shadow-sm">
            <span className="text-[18px] md:text-[22px]">💡</span> Tips: Cara Klaim Gratis Ongkir 0 Rupiah!
          </h2>
          <p className="text-[12px] md:text-[13px] text-white/90 leading-relaxed max-w-2xl">
            Banyak yang belum tahu trik ini! Pelajari cara menumpuk voucher toko, voucher cashback, dan gratis ongkir sekaligus agar belanjaanmu bisa super hemat bahkan Rp 0.
          </p>
        </div>
        
        <a 
          href={tutorialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-[16px] py-[10px] rounded-[2px] text-[12px] font-bold transition-all duration-300 w-full md:w-auto uppercase shadow-sm bg-white text-amber-600 hover:bg-gray-100 hover:shadow-md flex items-center justify-center gap-[6px] shrink-0"
        >
          <Gift className="w-[14px] h-[14px]" />
          <span>Lihat Triknya</span>
        </a>
      </div>
    </div>
  );
};
