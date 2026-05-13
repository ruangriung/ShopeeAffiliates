export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  rating?: number;
  soldCount?: string;
}

export interface Article {
  slug: string;
  title: string;
  content: string;
  tag?: string;
  date?: string;
  image?: string;
  excerpt?: string;
}
