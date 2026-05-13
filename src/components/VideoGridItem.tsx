import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface Props {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  badgeText?: string;
}

export const VideoGridItem: React.FC<Props> = ({ 
  videoUrl = "https://cdn.shopee.co.id/cv/asset/2023/11/08/9464522778848256.mp4", // Contoh video review Shopee
  thumbnailUrl = "https://down-aka-id.img.susercontent.com/id-11134207-7rbk3-m9nfgmj1dszm81.webp",
  title = "Review Glad2Glow 7in1 Bundle - Worth it?",
  badgeText = "Video Review"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="col-span-1 md:col-span-2 border border-[#e8e8e8] rounded-[4px] overflow-hidden bg-black relative group shadow-sm h-full flex flex-col">
      <div className="relative aspect-[9/16] md:aspect-auto md:flex-1 cursor-pointer overflow-hidden" onClick={togglePlay}>
        <video 
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
        />
        
        {/* Overlay saat tidak diputar */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/20">
            <div className="w-12 h-12 bg-[#ee4d2d] rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-white hover:text-[#ee4d2d] transition-colors">
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-[#ee4d2d] transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <Maximize className="w-4 h-4 text-white hover:text-[#ee4d2d] cursor-pointer" />
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-2 left-2 bg-[#ee4d2d]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider backdrop-blur-sm">
          {badgeText}
        </div>
      </div>

      <div className="p-3 bg-white border-t border-[#f0f0f0]">
        <h3 className="font-bold text-[12px] md:text-[13px] text-[#222] line-clamp-1 group-hover:text-[#ee4d2d] transition-colors">
          {title}
        </h3>
        <p className="text-[10px] text-[#757575] mt-1">Klik untuk tonton review lengkap</p>
      </div>
    </div>
  );
};
