import React from 'react';
import { Product } from '../types';
import { Heart, Share2, Crown } from 'lucide-react';

interface Props {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string, name?: string) => void;
  onShare: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({ product, isWishlisted, onToggleWishlist, onShare }) => {
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const isCustom = product.category === 'Custom' || product.id.startsWith('custom-');

  return (
    <a
      href={product.affiliateLink}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-[#e8e8e8] rounded-[4px] flex flex-col p-[6px] md:p-[8px] transition duration-200 hover:shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:border-[#ee4d2d] text-decoration-none group relative"
      title={product.name}
    >
      {isCustom && (
        <div className="absolute top-0 left-0 bg-[#eab308] text-white z-10 p-[4px] rounded-tl-[4px] rounded-br-[6px] shadow-sm" title="Produk Kustom">
          <Crown className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] text-white my-auto fill-white" />
        </div>
      )}
      <div className="w-full aspect-square relative bg-[#eee] mb-[6px] overflow-hidden shrink-0 rounded-[2px]">
        <img
          loading="lazy"
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-[#ffe97a] text-[#ee4d2d] text-[9px] md:text-[10px] px-[6px] py-[2px] font-bold rounded-bl-[4px]">
          Hot
        </div>
        <button
          onClick={(e) => {
             e.preventDefault();
             e.stopPropagation();
             onToggleWishlist(product.id, product.name);
          }}
          className="absolute bottom-[4px] right-[4px] bg-white/90 backdrop-blur-[2px] p-[6px] md:p-[8px] rounded-full hover:bg-white transition-colors shadow-sm min-w-[28px] min-h-[28px] md:min-w-[32px] md:min-h-[32px] flex items-center justify-center"
          aria-label={isWishlisted ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
        >
          <Heart 
            className={`w-[14px] h-[14px] md:w-[16px] md:h-[16px] ${isWishlisted ? 'fill-[#ee4d2d] text-[#ee4d2d]' : 'text-gray-500'}`} 
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onShare(product);
          }}
          className="absolute top-[4px] left-[4px] bg-white/90 backdrop-blur-[2px] p-[6px] md:p-[8px] rounded-full hover:bg-white transition-colors shadow-sm min-w-[28px] min-h-[28px] md:min-w-[32px] md:min-h-[32px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Bagikan produk"
        >
          <Share2 className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-gray-500" />
        </button>
      </div>
      
      <div className="text-[10px] md:text-[11px] leading-[1.3] h-[26px] md:h-[28px] overflow-hidden line-clamp-2 mb-[4px] text-[#222]">
        {product.name}
      </div>
        
      <div className="text-[#ee4d2d] font-bold text-[11px] md:text-[13px] mb-[6px] truncate">
        {formatRupiah(product.price)}
      </div>
      
      <div className="mt-auto">
        <button 
          className="w-full block bg-[#ee4d2d] text-white text-center text-[10px] md:text-[11px] py-[6px] md:py-[8px] min-h-[28px] md:min-h-[32px] rounded-[2px] uppercase font-bold transition-opacity hover:opacity-90"
          aria-label={`Beli ${product.name} di Shopee`}
          onClick={(e) => {
             // Only for visual effect, a tag takes care of navigation
             // We can stopPropagation so we don't trigger the standard link if we wanted to handle clicks manually, 
             // but here the wrapping <a> tag is desirable.
          }}
        >
          Beli
        </button>
      </div>
    </a>
  );
};
