import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { products as initialProducts, categories, generateProducts } from './data/products';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { Search, Heart, ArrowUp, CheckCircle, Info } from 'lucide-react';
import { Product, Article } from './types';
import { ArticleDetail } from './components/ArticleDetail';
import { customProductsMarkdown, parseCustomProducts, blogArticles, aiTipsArticles } from './config';

export default function App() {
  const allArticles = useMemo(() => [...blogArticles, ...aiTipsArticles], []);
  
  const initializeProducts = useCallback(() => {
    const customProducts = parseCustomProducts(customProductsMarkdown);
    const regularProducts = [...initialProducts];
    const finalProducts: Product[] = [];
    
    // Insert custom products spaced out over regular products (e.g. every 5 items)
    let customIndex = 0;
    const spacing = 5;
    
    let i = 0;
    while (i < regularProducts.length) {
      if (customIndex < customProducts.length && i > 0 && i % spacing === 0) {
        // Interleave custom products
        finalProducts.push(customProducts[customIndex]);
        customIndex++;
      }
      finalProducts.push(regularProducts[i]);
      i++;
    }
    
    // Put remaining custom products at the end if any
    while (customIndex < customProducts.length) {
      finalProducts.push(customProducts[customIndex]);
      customIndex++;
    }

    return finalProducts;
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>(initializeProducts());
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<'home' | 'article'>('home');
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string | null>(null);

  const currentArticle = useMemo(() => 
    allArticles.find(a => a.slug === currentArticleSlug), 
    [allArticles, currentArticleSlug]
  );

  const handleNavigateToArticle = (slug: string) => {
    setCurrentArticleSlug(slug);
    setActivePage('article');
    scrollToTop();
  };

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    // setTimeout to simulate network loading
    setTimeout(() => {
      setAllProducts(prev => [
        ...prev, 
        ...generateProducts(prev.length, 21)
      ]);
      setIsLoading(false);
    }, 500);
  }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [isLoading, loadMore]);

  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('shopee-wishlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set();
  });

  const [showWishlist, setShowWishlist] = useState(false);
  const [showClearWishlistConfirm, setShowClearWishlistConfirm] = useState(false);
  const [sortOption, setSortOption] = useState<string>('default');

  const clearWishlist = () => {
    setWishlist(new Set());
    localStorage.removeItem('shopee-wishlist');
    setShowClearWishlistConfirm(false);
  };

  const [toastMessage, setToastMessage] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  const lastScrollTime = useRef(0);
  const handleScroll = () => {
    const now = Date.now();
    if (now - lastScrollTime.current < 100) return;
    lastScrollTime.current = now;

    if (mainRef.current) {
      const shouldShow = mainRef.current.scrollTop > 300;
      if (showScrollTop !== shouldShow) {
        setShowScrollTop(shouldShow);
      }
    }
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleWishlist = (id: string, name?: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        if (name) showToast(`Dihapus dari wishlist: ${name}`, 'info');
      } else {
        next.add(id);
        if (name) showToast(`Ditambahkan ke wishlist: ${name}`, 'success');
      }
      localStorage.setItem('shopee-wishlist', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const shareProduct = async (product: Product) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Cek ${product.name} di Shopee, harganya cuma Rp ${product.price.toLocaleString('id-ID')}!`,
          url: product.affiliateLink,
        });
      } else {
        await navigator.clipboard.writeText(product.affiliateLink);
        showToast('Link produk berhasil disalin!', 'success');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(p => {
      if (showWishlist && !wishlist.has(p.id)) return false;
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [allProducts, activeCategory, searchQuery, sortOption, showWishlist, wishlist]);

  return (
    <div className="h-screen bg-[#f5f5f5] text-[#222] font-['Helvetica_Neue',Arial,sans-serif] flex flex-col overflow-hidden">
      <header className="bg-white px-[20px] py-[10px] border-b border-[#e8e8e8] flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-[12px]">
          <div className="flex items-center gap-[12px]">
            <div 
              onClick={() => setActivePage('home')}
              className="bg-[#ee4d2d] text-white px-[8px] py-[4px] font-bold rounded-[2px] text-[18px] cursor-pointer hover:bg-[#d74326] transition-colors"
            >
              Shopee Affiliate
            </div>
          </div>
          
          {/* Mobile Heart Icon */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setShowWishlist(!showWishlist)}
              className="relative flex items-center justify-center p-[6px] rounded-full hover:bg-[#f0f0f0] transition-colors cursor-pointer"
              title="Lihat Wishlist"
            >
              <Heart className={`w-[20px] h-[20px] ${showWishlist ? 'fill-[#ee4d2d] text-[#ee4d2d]' : 'text-[#757575]'}`} />
              {wishlist.size > 0 && (
                <span className="absolute top-0 right-0 bg-[#ee4d2d] text-white text-[9px] font-bold px-[4px] py-[1px] rounded-[10px] transform translate-x-1/4 -translate-y-1/4 border border-white">
                  {wishlist.size}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full md:w-auto max-w-[500px] relative">
          <input 
            type="text" 
            placeholder="Cari produk rekomendasi..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f8f8f8] border border-[#ddd] rounded-[4px] text-[13px] px-[12px] py-[8px] outline-none"
          />
        </div>

        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-[16px] overflow-x-auto pb-1 md:pb-0">
          <div className="hidden md:flex items-center gap-[12px]">
            <button 
              onClick={() => setShowWishlist(!showWishlist)}
              className="relative flex items-center justify-center p-[6px] rounded-full hover:bg-[#f0f0f0] transition-colors cursor-pointer"
              title="Lihat Wishlist"
            >
              <Heart className={`w-[20px] h-[20px] ${showWishlist ? 'fill-[#ee4d2d] text-[#ee4d2d]' : 'text-[#757575]'}`} />
              {wishlist.size > 0 && (
                <span className="absolute top-0 right-0 bg-[#ee4d2d] text-white text-[9px] font-bold px-[4px] py-[1px] rounded-[10px] transform translate-x-1/4 -translate-y-1/4 border border-white">
                  {wishlist.size}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={(cat) => { setActiveCategory(cat); setActivePage('home'); }}
      />

      <main 
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 overflow-auto flex flex-col items-center relative scroll-smooth"
      >
        {activePage === 'home' ? (
          <div className="w-full flex flex-col">
            {/* Prompt Section for Social Media Visitors */}
          <div className="flex items-center justify-between px-[12px] pt-[12px] pb-[4px]">
            <span className="text-[12px] text-[#757575]">
              {showWishlist ? `Menampilkan ${filteredAndSortedProducts.length} produk di Wishlist` : `Menampilkan ${filteredAndSortedProducts.length} produk`}
            </span>
            <div className="flex items-center gap-[8px]">
              {showWishlist && wishlist.size > 0 && (
                <button
                  onClick={() => setShowClearWishlistConfirm(true)}
                  className="text-[11px] md:text-[12px] text-[#ee4d2d] mr-2 font-medium hover:underline px-[6px] py-[4px]"
                >
                  Hapus Semua Wishlist
                </button>
              )}
              <label htmlFor="sort" className="text-[12px] text-[#757575] hidden sm:block">Urutkan:</label>
              <select 
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-[#ddd] rounded-[2px] text-[12px] px-[8px] py-[4px] outline-none cursor-pointer focus:border-[#ee4d2d]"
              >
                <option value="default">Relevansi</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="name-asc">Nama: A - Z</option>
                <option value="name-desc">Nama: Z - A</option>
              </select>
            </div>
          </div>
          
          {filteredAndSortedProducts.length > 0 ? (
            <>
              <ProductGrid 
                products={filteredAndSortedProducts} 
                articles={allArticles}
                wishlist={wishlist} 
                onToggleWishlist={toggleWishlist} 
                onShare={shareProduct}
                onCopyPrompt={() => showToast('Prompt berhasil di-copy! Coba gunakan di AI generator favoritmu.', 'success')}
                onNavigate={handleNavigateToArticle}
              />
              {!showWishlist && (
                <div 
                  ref={loaderRef} 
                  className="w-full h-[60px] flex items-center justify-center py-4"
                >
                  {isLoading && (
                    <div className="w-6 h-6 border-2 border-[#ee4d2d] border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-[16px] font-bold text-[#222] mb-2">Produk Tidak Ditemukan</h3>
              <p className="text-[#757575] text-[13px] mb-6 max-w-md">
                {showWishlist && wishlist.size === 0 
                  ? "Anda belum menambahkan produk apapun ke wishlist." 
                  : "Maaf, kami tidak dapat menemukan produk yang sesuai dengan pencarian atau filter Anda. Coba gunakan kata kunci yang lebih umum."}
              </p>
              <button 
                onClick={() => {
                  setSearchQuery(''); 
                  setActiveCategory('All'); 
                  setSortOption('default');
                  if (showWishlist && wishlist.size === 0) setShowWishlist(false);
                }}
                className="bg-[#ee4d2d] text-white px-6 py-2.5 rounded-[2px] text-[13px] font-bold shadow-sm hover:bg-[#d74326] transition-colors"
              >
                {showWishlist && wishlist.size === 0 ? "Jelajahi Produk" : "Hapus Filter & Pencarian"}
              </button>
            </div>
          )}
        </div>
        ) : activePage === 'article' && currentArticle ? (
          <ArticleDetail article={currentArticle} onBack={() => setActivePage('home')} />
        ) : (
          <div className="flex items-center justify-center py-20">
             <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
                <button onClick={() => setActivePage('home')} className="text-[#ee4d2d] hover:underline">Kembali ke Beranda</button>
             </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal for Clearing Wishlist */}
      {showClearWishlistConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[4px] p-6 max-w-sm w-full outline-none shadow-xl">
            <h2 className="text-[18px] font-bold text-[#222] mb-2">Hapus Semua Wishlist?</h2>
            <p className="text-[14px] text-[#757575] mb-6">
              Apakah Anda yakin ingin menghapus semua produk dari wishlist? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearWishlistConfirm(false)}
                className="px-4 py-2 text-[13px] font-medium text-[#555] bg-gray-100 rounded-[2px] hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={clearWishlist}
                className="px-4 py-2 text-[13px] font-bold text-white bg-[#ee4d2d] rounded-[2px] hover:bg-[#d74326] transition-colors shadow-sm"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button - Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-[20px] right-[20px] bg-white text-[#ee4d2d] p-[10px] rounded-full shadow-md border border-[#ee4d2d]/20 hover:bg-[#ffe97a] hover:text-[#ee4d2d] transition-all duration-300 z-40 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
        aria-label="Kembali ke Atas"
      >
        <ArrowUp className="w-[20px] h-[20px]" />
      </button>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#222]/90 backdrop-blur-sm text-white px-[16px] py-[10px] rounded-[4px] shadow-lg flex items-center gap-[8px] text-[13px] animate-[pulse_0.5s_cubic-bezier(0.4,0,0.6,1)]">
            {toastMessage.type === 'success' ? (
               <CheckCircle className="w-[16px] h-[16px] text-green-400" />
            ) : (
               <Info className="w-[16px] h-[16px] text-blue-400" />
            )}
            {toastMessage.message}
          </div>
        </div>
      )}
    </div>
  );
}
