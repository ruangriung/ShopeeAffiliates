import React from 'react';
import { Product, Article } from '../types';
import { ProductCard } from './ProductCard';
import { PromoGridItem } from './PromoGridItem';
import { PromptGridItem } from './PromptGridItem';
import { DriveGridItem } from './DriveGridItem';
import { CommunityGridItem } from './CommunityGridItem';
import { TipGridItem } from './TipGridItem';
import { ArticleCard } from './ArticleCard';

interface Props {
  products: Product[];
  articles: Article[];
  wishlist: Set<string>;
  onToggleWishlist: (id: string, name?: string) => void;
  onShare: (product: Product) => void;
  onCopyPrompt?: () => void;
  onNavigate?: (slug: string) => void;
}

export const ProductGrid = React.memo<Props>(({ products, articles, wishlist, onToggleWishlist, onShare, onCopyPrompt, onNavigate }) => {
  const renderGridItems = () => {
    const items: React.ReactNode[] = [];
    let articleIndex = 0;
    const articleSpacing = 8; // Tampilkan artikel setiap 8 produk
    
    // Jika tidak ada produk (misal: filter kategori Artikel), tampilkan semua artikel saja
    if (products.length === 0 && articles.length > 0) {
      articles.forEach((article, index) => {
        items.push(
          <div key={`article-card-${article.slug}-${index}`} className="col-span-1 border-none">
             <ArticleCard 
              article={article} 
              index={index}
              onClick={() => onNavigate && onNavigate(article.slug)} 
             />
          </div>
        );
      });
      return items;
    }

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

      // Selipkan Artikel dari folder content secara dinamis
      if ((index + 1) % articleSpacing === 0 && articleIndex < articles.length) {
        const article = articles[articleIndex];
        items.push(
          <div key={`article-card-${article.slug}-${index}`} className="col-span-1 border-none">
             <ArticleCard 
              article={article} 
              index={articleIndex}
              onClick={() => onNavigate && onNavigate(article.slug)} 
             />
          </div>
        );
        articleIndex++;
      }

      // 2. Iklan & Banner Dinamis - Muncul setiap 21 produk
      if ((index + 1) % 21 === 0 && index > 0) {
        const cycle = ((index + 1) / 21);
        
        // Banner (col-span-full akan otomatis pindah baris jika tidak muat, 
        // dan grid-flow-dense akan mengisi celah sebelumnya dengan produk selanjutnya)
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

    return items;
  };

  return (
    <div className="flex-1 p-[8px] md:p-[12px] grid grid-cols-3 md:grid-cols-7 grid-flow-row-dense gap-[6px] md:gap-[12px]">
      {renderGridItems()}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';


