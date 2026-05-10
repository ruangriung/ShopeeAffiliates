export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
  category: string;
}

export interface Article {
  slug: string;
  title: string;
  content: string;
  tag?: string;
  date?: string;
}
