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
  onReadGeminiTrick?: () => void;
  onReadBlog?: () => void;
  onReadVideoAI?: () => void;
}

export const ProductGrid: React.FC<Props> = ({ products, wishlist, onToggleWishlist, onShare, onCopyPrompt, onReadGeminiTrick, onReadBlog, onReadVideoAI }) => {
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

      // Selipkan kartu Blog dan AI (Bukan lebar penuh, tapi masuk flow grid seperti 1 item produk 1x1 kolum)
      if (index === 7) {
        items.push(
          <div key={`blog-card-${index}`} className="col-span-1 border-none">
             <BlogCard onClick={() => onReadBlog && onReadBlog()} />
          </div>
        );
      }
      if (index === 15) {
        items.push(
          <div key={`gemini-card-${index}`} className="col-span-1 border-none">
             <GeminiTipCard onClick={() => onReadGeminiTrick && onReadGeminiTrick()} />
          </div>
        );
      }
      if (index === 3) {
        items.push(
          <div key={`video-ai-card-${index}`} className="col-span-1 border-none">
             <VideoAICard onClick={() => onReadVideoAI && onReadVideoAI()} />
          </div>
        );
      }

      // 2. Iklan & Banner Dinamis Anti-Grid Kosong
      // Karena mobile punya 3 kolom dan desktop punya 7 kolom, KPK adalah 21.
      if ((index + 1) % 21 === 0) {
        // Tentukan variasi banner berdasarkan siklus
        const cycle = ((index + 1) / 21);

        if (cycle === 1) {
          // Banner Prompt Ekstra setelah 21 item (baris baru pas untuk semua device)
          items.push(
            <PromptGridItem 
              key={`prompt-slot-${index}`}
              onCopy={onCopyPrompt || (() => {})}
            />
          );
        } else if (cycle === 2) {
          // Banner folder Google Drive setelah 42 item
          items.push(
            <DriveGridItem
              key={`drive-slot-${index}`}
              driveLink="https://drive.google.com/drive"
            />
          );
        } else if (cycle === 3) {
          // Banner Komunitas Telegram setelah 63 item
          items.push(
            <CommunityGridItem
              key={`community-slot-${index}`}
              joinLink="https://t.me/"
            />
          );
        } else if (cycle === 4) {
          // Banner Edukasi/Tips setelah 84 item
          items.push(
            <TipGridItem
              key={`tip-slot-${index}`}
              tutorialLink="https://shopee.co.id/m/gratis-ongkir"
            />
          );
        } else if (cycle % 2 === 1) {
          items.push(
            <PromoGridItem 
              key={`promo-slot-${index}`} 
              title="🎁 Kode Promo Spesial Hari Ini!" 
              description="Gunakan kode 'RACUNSHOPEE' untuk mendapatkan ekstra diskon s.d 50rb."
              buttonText="Klaim Voucher"
              link="https://shopee.co.id/m/cashback-voucher"
              badgeText="Ad"
            />
          );
        } else {
          items.push(
            <PromoGridItem 
              key={`promo-slot-${index}`}
              title="💥 Flash Sale Akan Segera Berakhir!" 
              description="Borong produk idamanmu dengan harga di bawah 50rb, stok terbatas!"
              buttonText="Ke Halaman Promo"
              link="https://shopee.co.id/flash_sale"
              badgeText="Flash Sale"
            />
          );
        }
      }
    });

    return items;
  };

  return (
    <div className="flex-1 p-[8px] md:p-[12px] grid grid-cols-3 md:grid-cols-7 gap-[6px] md:gap-[12px]">
      {renderGridItems()}
    </div>
  );
};

