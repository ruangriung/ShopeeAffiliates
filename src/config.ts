import { Product, Article } from './types';

// Dynamic import for content
const blogModules = import.meta.glob('./content/blog/*.md', { query: '?raw', eager: true });
const aiTipsModules = import.meta.glob('./content/ai-tips/*.md', { query: '?raw', eager: true });
const productModules = import.meta.glob('./content/products/**/*.md', { query: '?raw', eager: true });

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
    date: attributes.date ? String(attributes.date) : undefined,
    image: attributes.image,
    excerpt: attributes.excerpt
  };
};

const parseProduct = (path: string, module: any): Product => {
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  const rawContent = (module as { default: string }).default;
  const { attributes } = fm<any>(rawContent);
  
  return {
    id: `prod-${slug}`,
    name: attributes.name || 'Untitled Product',
    price: attributes.price || 0,
    imageUrl: attributes.imageUrl || '',
    affiliateLink: attributes.affiliateLink || '',
    category: attributes.category || 'Lainnya',
    rating: attributes.rating,
    soldCount: attributes.soldCount
  };
};

export const blogArticles: Article[] = Object.entries(blogModules).map(([path, module]) => parseArticle(path, module));
export const aiTipsArticles: Article[] = Object.entries(aiTipsModules).map(([path, module]) => parseArticle(path, module));
export const customProducts: Product[] = Object.entries(productModules).map(([path, module]) => parseProduct(path, module));

// We keep these exports for backward compatibility in App.tsx
export const customProductsMarkdown = ""; 
export const parseCustomProducts = () => customProducts;
