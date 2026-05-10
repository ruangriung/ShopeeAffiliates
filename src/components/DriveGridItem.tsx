import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Props {
  driveLink: string;
}

export const DriveGridItem: React.FC<Props> = ({ driveLink }) => {
  return (
    <div className="col-span-3 md:col-span-7 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2px] p-[16px] text-white shadow-sm my-[4px] relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
      <div className="absolute left-[-20px] bottom-[-20px] opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.95 3.53 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18Z" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[12px]">
        <div className="flex-1">
          <h2 className="text-[15px] md:text-[18px] font-bold mb-[6px] flex items-center gap-[6px] drop-shadow-sm">
            <span className="text-[18px] md:text-[22px]">📁</span> Akses Folder Google Drive
          </h2>
          <p className="text-[12px] md:text-[13px] text-white/90 leading-relaxed max-w-2xl">
            Dapatkan kumpulan aset, gambar, dan resource gratis lainnya. Update otomatis langsung dari Google Drive saya tanpa perlu menunggu pembaruan web!
          </p>
        </div>
        
        <a 
          href={driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-[16px] py-[10px] rounded-[2px] text-[12px] font-bold transition-all duration-300 w-full md:w-auto uppercase shadow-sm bg-white text-blue-600 hover:bg-gray-100 hover:shadow-md flex items-center justify-center gap-[6px] shrink-0"
        >
          <span>Buka Folder</span>
          <ExternalLink className="w-[14px] h-[14px]" />
        </a>
      </div>
    </div>
  );
};
