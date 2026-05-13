import React from 'react';
import { Article } from '../types';
import { BookOpen, Sparkles, Video, Zap } from 'lucide-react';

interface Props {
  article: Article;
  onClick: () => void;
  index: number;
}

export const ArticleCard: React.FC<Props> = ({ article, onClick, index }) => {
  // Cycle through some nice gradients
  const gradients = [
    'from-orange-400 to-rose-400',
    'from-blue-500 to-indigo-600',
    'from-emerald-400 to-teal-600',
    'from-violet-500 to-purple-600',
  ];
  
  const icons = [
    <BookOpen className="w-5 h-5 text-white" />,
    <Video className="w-5 h-5 text-white" />,
    <Sparkles className="w-5 h-5 text-white" />,
    <Zap className="w-5 h-5 text-white" />,
  ];

  const gradient = gradients[index % gradients.length];
  const icon = icons[index % icons.length];

  return (
    <div 
      onClick={onClick}
      className={`relative bg-white border border-[#e8e8e8] rounded-[4px] flex flex-col overflow-hidden transition duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-[1.01] cursor-pointer h-full group`}
    >
      {/* Background Image / Gradient */}
      <div className={`w-full aspect-video relative overflow-hidden ${!article.image ? `bg-gradient-to-br ${gradient}` : ''}`}>
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {icon}
          </div>
        )}
        
        {article.tag && (
          <div className="absolute top-2 left-2 bg-[#ee4d2d] text-white text-[9px] font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wide shadow-md z-10">
            {article.tag}
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-[13px] leading-tight text-[#222] mb-2 line-clamp-2 group-hover:text-[#ee4d2d] transition-colors">
          {article.title}
        </h3>
        
        {article.excerpt && (
          <p className="text-[11px] text-[#757575] leading-[1.4] line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[10px] text-[#999]">{article.date || 'Terbaru'}</span>
          <div className="flex items-center gap-1 text-[#ee4d2d] text-[11px] font-bold uppercase tracking-wider">
            Baca <BookOpen className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
