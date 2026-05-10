import React from 'react';

interface Props {
  title?: string;
  description?: string;
  buttonText?: string;
  link?: string;
  badgeText?: string;
}

export const PromoGridItem: React.FC<Props> = ({ 
  title = "🔥 Promo Spesial Pengguna Baru!", 
  description = "Klaim voucher gratis ongkir dan diskon XTRA hingga 90% sekarang juga.",
  buttonText = "Klaim Di Sini",
  link = "https://shopee.co.id",
  badgeText = "Sponsor"
}) => {
  return (
    <div className="col-span-3 md:col-span-7 bg-gradient-to-r from-[#ee4d2d] to-[#ff7337] rounded-[2px] p-[12px] md:p-[16px] flex flex-col md:flex-row items-center justify-between shadow-sm my-[4px] border border-[#ff9166] relative overflow-hidden group">
      {/* Dekorasi Background */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
      
      <div className="text-white mb-[12px] md:mb-0 text-center md:text-left relative z-10 w-full md:w-auto">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-[4px]">
          <span className="bg-white/20 text-white text-[9px] px-[6px] py-[2px] rounded-full uppercase font-bold tracking-widest backdrop-blur-sm">
            {badgeText}
          </span>
        </div>
        <h3 className="font-bold text-[15px] md:text-[18px] leading-tight mb-[4px] drop-shadow-sm">{title}</h3>
        <p className="text-[11px] md:text-[13px] text-white/90 font-medium">{description}</p>
      </div>
      
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 bg-white text-[#ee4d2d] w-full md:w-auto text-center px-[20px] py-[8px] md:py-[10px] rounded-[2px] font-bold text-[11px] md:text-[13px] hover:bg-[#f8f8f8] transition-colors uppercase shadow-sm"
      >
        {buttonText}
      </a>
    </div>
  );
};
