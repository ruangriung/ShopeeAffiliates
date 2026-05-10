import React, { useState } from 'react';

interface Props {
  onCopy: () => void;
}

export const PromptGridItem: React.FC<Props> = ({ onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("A hyper-realistic cinematic portrait of a cyberpunk character, neon lighting, 8k resolution, highly detailed, masterpieces, trending on artstation");
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="col-span-3 md:col-span-7 bg-gradient-to-r from-violet-600 to-[#ee4d2d] rounded-[2px] p-[16px] text-white shadow-sm my-[4px] relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
      <div className="absolute left-[-20px] bottom-[-20px] opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full">
        <h2 className="text-[15px] md:text-[18px] font-bold mb-[6px] flex items-center gap-[6px] drop-shadow-sm">
          <span className="text-[18px] md:text-[22px]">✨</span> Prompt Rahasia dari Sosmed!
        </h2>
        <p className="text-[12px] md:text-[13px] text-white/90 mb-[16px] leading-relaxed">
          Terima kasih sudah mampir! Ini dia prompt rahasia untuk menghasilkan gambar estetik yang saya janjikan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-[8px] bg-black/20 rounded-[4px] p-[4px] w-full items-stretch sm:items-center border border-white/10 shadow-inner">
          <div className="flex-1 px-[12px] py-[8px] font-mono text-[11px] md:text-[12px] text-white/90 overflow-hidden text-ellipsis whitespace-nowrap" title="A hyper-realistic cinematic portrait of a cyberpunk character, neon lighting, 8k resolution, highly detailed, masterpieces, trending on artstation">
            A hyper-realistic cinematic portrait of a cyberpunk character, neon lighting, 8k resolution...
          </div>
          <button 
            onClick={handleCopy}
            className={`px-[16px] py-[8px] rounded-[2px] text-[12px] font-bold transition-all duration-300 w-full sm:w-auto uppercase shadow-sm ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-[#ee4d2d] hover:bg-gray-100 hover:shadow-md'
            }`}
          >
            {copied ? 'Berhasil Di-copy!' : 'Copy Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};
