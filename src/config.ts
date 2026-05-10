import { Product, Article } from './types';
import customProductsMarkdown from './content/custom-products.md?raw';

// Dynamic import for content
const blogModules = import.meta.glob('./content/blog/*.md', { query: '?raw', eager: true });
const aiTipsModules = import.meta.glob('./content/ai-tips/*.md', { query: '?raw', eager: true });

/**
 * Simple Frontmatter Parser to avoid Node.js Buffer dependencies
 */
const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  yamlBlock.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim();
    }
  });

  return { data, content };
};

const parseArticle = (path: string, module: any): Article => {
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  const rawContent = (module as { default: string }).default;
  const { data, content } = parseFrontmatter(rawContent);
  
  return {
    slug,
    title: data.title || 'Untitled',
    content: content,
    tag: data.tag,
    date: data.date
  };
};

export const blogArticles: Article[] = Object.entries(blogModules).map(([path, module]) => parseArticle(path, module));
export const aiTipsArticles: Article[] = Object.entries(aiTipsModules).map(([path, module]) => parseArticle(path, module));

export { customProductsMarkdown };

export const parseCustomProducts = (md: string): Product[] => {
  const { content: cleanMd } = parseFrontmatter(md);
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
