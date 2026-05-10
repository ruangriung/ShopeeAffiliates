# Affiliate Store & Blog Template

Sebuah template website modern berbasis React dan Vite yang dirancang khusus untuk pembuat konten, affiliate marketer, dan kurator produk. Website ini tidak membutuhkan database kompleks; semua konten (produk, artikel blog, dan panduan) dikelola dengan mudah melalui kumpulan file Markdown yang tertata dalam folder.

## ✨ Fitur Utama

- **Katalog Produk Cepat & Ringan**: Tampilkan produk afiliasi Anda lengkap dengan gambar, harga, dan tautan langsung.
- **Produk Kustom (Markdown)**: Sisipkan produk-produk prioritas (ditandai dengan ikon mahkota 👑) yang disebar secara otomatis di antara katalog utama menggunakan pengaturan Markdown yang mudah.
- **Modul Blog & Artikel**: Tulis artikel review atau cerita Anda langsung menggunakan sintaks Markdown.
- **Bagian Tips & Edukasi AI**: Halaman khusus untuk membagikan tips seputar AI (seperti Google Gemini dan Video Generator).
- **Fitur Wishlist (Simpan)**: Pengunjung dapat menyimpan produk favorit mereka secara lokal di perangkat mereka.
- **Integrasi Markdown**: Semua teks panjang didukung oleh `react-markdown`.
- **Desain Responsif & Modern**: Styling menggunakan Tailwind CSS, memastikan tampilan sempurna di HP, tablet, maupun Desktop.

## 🛠️ Teknologi yang Digunakan

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Ikon)
- [React Markdown](https://github.com/remarkjs/react-markdown)

## 🚀 Cara Menjalankan di Lokal (Development)

1. Clone repositori ini:
   ```bash
   git clone <url-repo-anda>
   cd <nama-folder>
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   ```

## 📝 Cara Mengubah Konten (Kustomisasi)

Anda tidak butuh database! Konten dikelola melalui file Markdown di folder `src/content/`:

### 1. Katalog Produk Kustom
Buka `src/content/custom-products.md`. Tambahkan produk unggulan Anda menggunakan format Markdown (Judul H2 untuk nama produk). Produk ini akan ditandai dengan ikon mahkota 👑 di beranda.

### 2. Artikel Blog
Tambahkan file `.md` baru di folder `src/content/blog/`. Setiap file akan otomatis memiliki halaman sendiri berdasarkan nama filenya (slug). Gunakan format **Frontmatter** di bagian atas file:
```markdown
---
title: Judul Artikel Anda
date: 2024-05-10
tag: Review
description: Deskripsi singkat untuk kartu blog
---
Konten artikel Anda di sini...
```

### 3. Tips AI & Video
Tambahkan file `.md` baru di folder `src/content/ai-tips/`. Sama seperti blog, gunakan Frontmatter untuk judul dan metadata.

## 🛠️ Arsitektur Konten
Website ini menggunakan `import.meta.glob` untuk membaca file Markdown secara dinamis. Anda cukup menambah atau menghapus file di folder yang sesuai tanpa perlu mengubah kode sumber.

## ☁️ Cara Deploy ke Cloudflare Pages

Proyek ini sudah dilengkapi dengan konfigurasi `public/_redirects` untuk memastikan routing React berjalan lancar di Cloudflare Pages (SPA Routing).

1. Buat akun / Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Masuk ke menu **Workers & Pages** -> **Create application** -> Tab **Pages** -> **Connect to Git**.
3. Pilih repositori GitHub ini.
4. Pada bagian **Build settings**, atur sebagai berikut:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Klik **Save and Deploy**. Selesai! Website Anda akan online dalam waktu singkat.
