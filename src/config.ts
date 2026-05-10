import { Product, Article } from './types';
import customProductsMarkdown from './content/custom-products.md?raw';

// Dynamic import for content
const blogModules = import.meta.glob('./content/blog/*.md', { query: '?raw', eager: true });
const aiTipsModules = import.meta.glob('./content/ai-tips/*.md', { query: '?raw', eager: true });

import fm from 'front-matter';

const parseArticle = (path: string, module: any): Article => {
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  const rawContent = (module as { default: string }).default;
  
  // Use front-matter to parse
  const { attributes, body } = fm<any>(rawContent);
  
  return {
    slug,
    title: attributes.title || 'Untitled',
    content: body,
    tag: attributes.tag,
    date: attributes.date ? String(attributes.date) : undefined
  };
};

export const blogArticles: Article[] = Object.entries(blogModules).map(([path, module]) => parseArticle(path, module));
export const aiTipsArticles: Article[] = Object.entries(aiTipsModules).map(([path, module]) => parseArticle(path, module));

export { customProductsMarkdown };

export const parseCustomProducts = (md: string): Product[] => {
  const { body: cleanMd } = fm(md);
  const products: Product[] = [];
  const lines = cleanMd.split('\n');
  let currentProduct: Partial<Product> | null = null;
  let idCounter = 1;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentProduct && currentProduct.name && currentProduct.imageUrl && currentProduct.affiliateLink) {
        products.push(currentProduct as Product);
      }
      currentProduct = {
        id: `custom-md-${idCounter++}-${Date.now()}`,
        name: line.replace('## ', '').trim(),
        category: 'Custom',
        price: 0,
        imageUrl: '',
        affiliateLink: ''
      };
    } else if (line.startsWith('- **Harga:**')) {
      if (currentProduct) currentProduct.price = parseInt(line.replace('- **Harga:**', '').trim()) || 0;
    } else if (line.startsWith('- **URL:**')) {
      if (currentProduct) currentProduct.affiliateLink = line.replace('- **URL:**', '').trim();
    } else if (line.startsWith('- **Gambar:**')) {
      if (currentProduct) currentProduct.imageUrl = line.replace('- **Gambar:**', '').trim();
    }
  }

  if (currentProduct && currentProduct.name && currentProduct.imageUrl && currentProduct.affiliateLink) {
    products.push(currentProduct as Product);
  }

  return products;
};
