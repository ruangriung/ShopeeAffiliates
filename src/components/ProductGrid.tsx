import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { PromoGridItem } from './PromoGridItem';
import { PromptGridItem } from './PromptGridItem';
import { DriveGridItem } from './DriveGridItem';
import { CommunityGridItem } from './CommunityGridItem';
import { TipGridItem } from './TipGridItem';
import { BlogCard } from './BlogCard';
import { GeminiTipCard } from './GeminiTipCard';
import { VideoAICard } from './VideoAICard';

interface Props {
  products: Product[];
  wishlist: Set<string>;
  onToggleWishlist: (id: string, name?: string) => void;
  onShare: (product: Product) => void;
  onCopyPrompt?: () => void;
  onNavigate?: (slug: string) => void;
}

export const ProductGrid: React.FC<Props> = ({ products, wishlist, onToggleWishlist, onShare, onCopyPrompt, onNavigate }) => {
  const renderGridItems = () => {
    const items: React.ReactNode[] = [];
    
    products.forEach((product, index) => {
      // 1. Tambahkan produk ke grid
      items.push(
        <ProductCard 
          key={product.id} 
          product={product} 
          isWishlisted={wishlist.has(product.id)}
          onToggleWishlist={onToggleWishlist}
          onShare={onShare}
        />
      );

      // Selipkan kartu Blog dan AI di posisi strategis
      // Kita selipkan di tempat yang menarik perhatian
      if (index === 6) {
        items.push(
          <div key={`video-ai-card-${index}`} className="col-span-1 border-none">
             <VideoAICard onClick={() => onNavigate && onNavigate('video-ai-generator')} />
          </div>
        );
      }
      if (index === 13) {
        items.push(
          <div key={`blog-card-${index}`} className="col-span-1 border-none">
             <BlogCard onClick={() => onNavigate && onNavigate('review-gadget')} />
          </div>
        );
      }
      if (index === 20) {
        items.push(
          <div key={`gemini-card-${index}`} className="col-span-1 border-none">
             <GeminiTipCard onClick={() => onNavigate && onNavigate('trik-rahasia-ai')} />
          </div>
        );
      }

      // 2. Iklan & Banner Dinamis - Muncul setiap 21 produk
      if ((index + 1) % 21 === 0 && index > 0) {
        // ANTI-GRID KOSONG: Isi baris desktop (7 kol) agar banner mulai di baris baru
        const remainderDesktop = items.length % 7;
        if (remainderDesktop !== 0) {
          for (let i = 0; i < 7 - remainderDesktop; i++) {
            items.push(<div key={`spacer-md-${index}-${i}`} className="hidden md:block" />);
          }
        }
        
        // Anti-grid kosong mobile (3 kol)
        const remainderMobile = items.length % 3;
        if (remainderMobile !== 0) {
          for (let i = 0; i < 3 - remainderMobile; i++) {
            items.push(<div key={`spacer-sm-${index}-${i}`} className="md:hidden" />);
          }
        }

        const cycle = ((index + 1) / 21);
        
        // Banner (selalu col-span-full)
        if (cycle === 1) {
          items.push(<PromptGridItem key={`ps-${index}`} onCopy={onCopyPrompt || (() => {})} />);
        } else if (cycle === 2) {
          items.push(<DriveGridItem key={`ds-${index}`} driveLink="https://drive.google.com/drive" />);
        } else if (cycle === 3) {
          items.push(<CommunityGridItem key={`cs-${index}`} joinLink="https://t.me/" />);
        } else if (cycle === 4) {
          items.push(<TipGridItem key={`ts-${index}`} tutorialLink="https://shopee.co.id/" />);
        } else if (cycle % 2 === 1) {
          items.push(
            <PromoGridItem 
              key={`pslo-${index}`} 
              title="🎁 Kode Promo Spesial!" 
              description="Potongan s.d 50rb untuk pengguna baru." 
              link="https://shopee.co.id/" 
              buttonText="Cek Now"
            />
          );
        } else {
          items.push(
            <PromoGridItem 
              key={`fslo-${index}`} 
              title="💥 Flash Sale Terbatas!" 
              description="Harga mulai dari Rp 99,- saja!" 
              link="https://shopee.co.id/flash_sale" 
              buttonText="Serbu"
            />
          );
        }
      }
    });

    // PASTIKAN BARIS TERAKHIR PENUH (Agar Grid tidak compang-camping di bawah)
    const finalRemainderDesktop = items.length % 7;
    if (finalRemainderDesktop !== 0) {
      for (let i = 0; i < 7 - finalRemainderDesktop; i++) {
        items.push(<div key={`final-spacer-md-${i}`} className="hidden md:block" />);
      }
    }
    const finalRemainderMobile = items.length % 3;
    if (finalRemainderMobile !== 0) {
      for (let i = 0; i < 3 - finalRemainderMobile; i++) {
        items.push(<div key={`final-spacer-sm-${i}`} className="md:hidden" />);
      }
    }

    return items;
  };

  return (
    <div className="flex-1 p-[8px] md:p-[12px] grid grid-cols-3 md:grid-cols-7 gap-[6px] md:gap-[12px]">
      {renderGridItems()}
    </div>
  );
};

