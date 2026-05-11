---
title: "Otomasi Konten Shopee dengan Python & AI"
date: 2024-05-11
tag: AI Automation
description: "Panduan teknis cara menggunakan Python untuk membuat deskripsi produk otomatis menggunakan API Gemini."
---

Ingin menghemat waktu saat posting ratusan produk affiliate? Kamu bisa menggunakan Python dan AI untuk membuat deskripsi yang menarik secara otomatis. Berikut adalah contoh script sederhana untuk memulainya.

### 1. Persiapan Environment
Pastikan kamu sudah menginstall library `google-generativeai`. Kamu bisa menginstalnya lewat terminal:

```bash
pip install -q -U google-generativeai
```

### 2. Script Python Sederhana
Berikut adalah kode untuk memanggil API Gemini dan membuat deskripsi produk Shopee berdasarkan nama produk saja.

```python
import google.generativeai as genai
import os

# Masukkan API Key kamu di sini
genai.configure(api_key="YOUR_GEMINI_API_KEY")

model = genai.GenerativeModel('gemini-pro')

def generate_shopee_desc(product_name):
    prompt = f"Buatkan deskripsi singkat dan menarik untuk produk Shopee: {product_name}. Sertakan hashtag relevan."
    response = model.generate_content(prompt)
    return response.text

# Contoh penggunaan
produk = "Sepatu Sneakers Ventela Public Low Black White"
print(f"Hasil Deskripsi:\n{generate_shopee_desc(produk)}")
```

### 3. Kenapa Menggunakan Format Ini?
Dengan elemen `pre` di atas, kode kamu akan tampil dengan rapi, memiliki kontras yang tinggi, dan mudah disalin tanpa ada gangguan warna background yang clashing. 

> **Tips:** Jangan pernah membagikan API Key kamu secara publik. Gunakan file `.env` untuk keamanan tambahan!

Selamat mencoba otomasi kontenmu!
