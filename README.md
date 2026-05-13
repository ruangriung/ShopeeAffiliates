# Katalog Pilihan - Affiliate Store & Blog

Katalog Pilihan adalah platform kurasi produk Shopee affiliate terbaik. Website ini modern, ringan, dan berbasis React + Vite, dirancang khusus untuk kurator produk yang ingin menampilkan rekomendasi mereka dengan profesional. Website ini tidak membutuhkan database; semua konten dikelola melalui file Markdown.

## ✨ Fitur Utama

- **Katalog Produk Modular**: Produk dikelola melalui file Markdown di folder `src/content/products/`, mendukung sub-kategori.
- **Dynamic SEO**: Judul halaman dan meta deskripsi diperbarui secara dinamis berdasarkan konten yang sedang dilihat.
- **Modul Blog & Artikel**: Tulis artikel review menggunakan sintaks Markdown di folder `src/content/blog/`.
- **Halaman Statis**: Kelola halaman seperti About, Kebijakan Privasi, dan Kontak melalui Markdown.
- **Fitur Wishlist**: Pengunjung dapat menyimpan produk favorit secara lokal (localStorage).
- **Desain Modern & Responsif**: Menggunakan Tailwind CSS v4 dengan tipografi yang dioptimalkan.

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19, Vite 6
- **Styling**: Tailwind CSS v4
- **Ikon**: Lucide React
- **Konten**: React Markdown (Remark GFM, Smartypants)

## 🚀 Cara Menjalankan di Lokal

1. Clone repositori:
   ```bash
   git clone <url-repo>
   cd ShopeeAffiliates
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   ```

## 📝 Pengelolaan Konten

### 1. Menambah Produk
Tambahkan file `.md` di `src/content/products/category-name/product-slug.md`:
```markdown
---
name: "Nama Produk"
price: 150000
imageUrl: "https://example.com/image.jpg"
affiliateLink: "https://shope.ee/..."
category: "Fashion"
rating: 4.8
soldCount: "1.2rb"
---
```

### 2. Menambah Artikel Blog
Tambahkan file `.md` di `src/content/blog/`:
```markdown
---
title: "Judul Artikel"
date: "2024-05-14"
tag: "Review"
excerpt: "Ringkasan artikel untuk SEO"
---
Isi konten blog di sini...
```

### 3. Menambah Halaman Statis
Tambahkan file `.md` di `src/content/pages/`.

## ☁️ Deployment

Website ini siap di-deploy ke **Cloudflare Pages** atau **Vercel**. Pastikan build command diatur ke `npm run build` dan output directory ke `dist`.
