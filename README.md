# 🍲 DapurKu Gunung Walat

DapurKu adalah sebuah aplikasi web e-commerce *landing page* yang dibuat khusus untuk memberdayakan UMKM rumahan. Aplikasi ini dibangun dengan standar teknologi kelas *Enterprise* untuk memastikan performa yang kilat, keamanan tingkat tinggi, dan kemudahan dalam menerima pesanan langsung melalui WhatsApp.

## 🚀 Teknologi yang Digunakan
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Metode Render:** Static Site Generation (SSG) murni - *Super Cepat & Anti-Retas*
- **Ikon:** [Lucide React](https://lucide.react.dev/)

## 🌟 Fitur Utama
1. **Katalog Menu Interaktif:** Menampilkan makanan dan cemilan dengan antarmuka yang modern, premium, dan 100% responsif di semua perangkat.
2. **Sistem Varian & Keranjang:** Pelanggan dapat memilih varian produk (misal: Pedas/Sedang, 3pcs/6pcs) dan memasukkannya ke dalam keranjang belanja interaktif.
3. **Checkout via WhatsApp:** Memproses pesanan secara ringkas. Sistem akan otomatis merekap daftar menu, catatan tambahan, dan total harga ke WhatsApp admin dengan format yang rapi dan terstruktur.
4. **Optimasi SEO Maksimal:** Tag Meta dan OpenGraph (*Preview Link*) lengkap agar mudah diindeks oleh Google dan terlihat profesional saat link disebarkan di sosial media.

## ⚙️ Panduan Pemeliharaan Menu (Untuk Klien / Developer)

Semua data menu (nama, harga, kategori, deskripsi, dan gambar) disimpan terpusat di dalam file:
📂 [src/app/page.tsx](file:///C:/Users/revan/.gemini/antigravity/scratch/dapurku-gunung-walat/src/app/page.tsx) pada bagian variabel `menuData`.

### Menambah/Mengubah Gambar Menu
1. Letakkan gambar produk baru di dalam folder:
   📂 [public/produk/](file:///C:/Users/revan/.gemini/antigravity/scratch/dapurku-gunung-walat/public/produk)
2. Format gambar direkomendasikan berjenis `.png` atau `.jpg`.
3. Perbarui properti `image` pada item menu di `menuData` menjadi: `"/produk/nama-file-anda.png"`.

### Mengubah Nomor WhatsApp Tujuan
Cari baris kode fungsi `checkoutWA` di [src/app/page.tsx](file:///C:/Users/revan/.gemini/antigravity/scratch/dapurku-gunung-walat/src/app/page.tsx) (sekitar baris 140) dan ubah nomor telepon tujuan pada URL `https://wa.me/...` (pastikan menggunakan format kode negara tanpa spasi, misal `62856xxxxxxxx`).

## 💻 Cara Menjalankan di Komputer Lokal

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

1. Buka terminal/Command Prompt di folder ini.
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
4. Buka browser dan akses: `http://localhost:3000`

## 📦 Cara Deploy (Update ke Internet)
Karena kita sudah menyambungkannya ke **GitHub** dan **Vercel**, cara *update*-nya sangat mudah:
1. Simpan perubahan kode Anda (`git add .`)
2. Berikan pesan *commit* (`git commit -m "update data menu"`)
3. Unggah ke GitHub (`git push origin master`)
4. **Selesai!** Vercel akan otomatis menarik kode terbaru dan memperbarui *website* Anda dalam hitungan detik.

---
*Didesain dan dikembangkan untuk kemajuan UMKM Indonesia.*
