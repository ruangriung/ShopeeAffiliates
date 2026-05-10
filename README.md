# Affiliate Store & Blog Template

Sebuah template website modern berbasis React dan Vite yang dirancang khusus untuk pembuat konten, affiliate marketer, dan kurator produk. Website ini tidak membutuhkan database kompleks; semua konten (produk, artikel blog, dan panduan) dapat dikustomisasi dengan mudah melalui file konfigurasi berbasis Markdown.

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

Anda tidak butuh database! Buka file `src/config.ts` untuk mengubah isi website Anda:

- **`customProductsMarkdown`**: Tambahkan produk unggulan Anda di sini menggunakan format Markdown.
- **`blogMarkdown`**: Tulis artikel blog Anda di sini.
- **`geminiTipsMarkdown`** & **`videoAIMarkdown`**: Masukkan panduan/tips and trik Anda.

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
