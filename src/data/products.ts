import { Product } from '../types';

export const categories = [
  'Elektronik', 
  'Fashion', 
  'Makanan', 
  'Kecantikan', 
  'Rumah Tangga', 
  'Olahraga',
  'AI Tips',
  'Blog'
];

export const generateProducts = (startIndex: number, count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    const category = categories[index % categories.length];
    let name = '';
    
    if (category === 'Elektronik') {
      name = `TWS Bluetooth Headset V${index + 1} Pro Max Noise Cancelling Earphone`;
    } else if (category === 'Fashion') {
      name = `Kaos Polos Oversize Pria Wanita Cotton Combed 30s V${index + 1}`;
    } else if (category === 'Makanan') {
      name = `Keripik Kaca Super Pedas Daun Jeruk 100gr Level ${index + 1}`;
    } else if (category === 'Kecantikan') {
      name = `Serum Glowing Niacinamide 10% + Zinc 1% ${index + 1}0ml Original`;
    } else if (category === 'Rumah Tangga') {
      name = `Sapu Lantai Otomatis Magic Broom 3 in 1 Series ${index + 1}`;
    } else {
      name = `Matras Yoga Anti Slip NBR Tebal 10mm Warna Warni Import ${index + 1}`;
    }

    return {
      id: (index + 1).toString(),
      name,
      price: Math.floor(Math.random() * 270) * 500 + 15000,
      imageUrl: `https://picsum.photos/seed/${index + 100}/200/200`,
      affiliateLink: `https://shopee.co.id/search?keyword=${encodeURIComponent(name)}`,
      category
    };
  });
};

// Menghasilkan 100 data dummy produk yang realistis
export const products: Product[] = generateProducts(0, 100);
