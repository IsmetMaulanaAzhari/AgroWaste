# 🌾 AgroWaste Academy

Platform edukasi digital untuk pengelolaan limbah pertanian menjadi produk bernilai ekonomis. Dibangun dengan Laravel, Inertia.js, dan React.

![AgroWaste Academy](https://img.shields.io/badge/Laravel-11-red) ![React](https://img.shields.io/badge/React-18-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-teal)

## 📋 Tentang Aplikasi

AgroWaste Academy adalah platform pembelajaran online yang membantu petani dan masyarakat umum untuk:
- Memahami cara mengolah limbah pertanian
- Belajar melalui modul, video, dan kuis interaktif
- Mengubah limbah menjadi produk bernilai ekonomis

## ✨ Fitur Utama

### 👤 User (Pengguna)
- 📚 **Modul Pembelajaran** - Materi bacaan dengan format yang mudah dipahami
- 🎥 **Video Tutorial** - Panduan visual langkah demi langkah
- 📝 **Kuis Interaktif** - Uji pemahaman dengan soal pilihan ganda
- 📊 **Dashboard** - Pantau progress belajar

### 👨‍💼 Admin
- 📖 Kelola modul pembelajaran (CRUD)
- 🎬 Kelola video tutorial
- ❓ Kelola kuis dan soal-soal
- 👥 Kelola pengguna

## 🛠️ Teknologi

- **Backend:** Laravel 11
- **Frontend:** React 18 + Inertia.js
- **Styling:** TailwindCSS
- **Database:** MySQL / SQLite
- **Authentication:** Laravel Breeze (dual guard: admin & user)

## 🚀 Instalasi

### Prasyarat
- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL atau SQLite

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/IsmetMaulanaAzhari/AgroWaste.git
   cd AgroWaste
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Konfigurasi database** di file `.env`
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=agrowaste
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Jalankan migrasi dan seeder**
   ```bash
   php artisan migrate --seed
   php artisan storage:link
   ```

6. **Build assets & jalankan server**
   ```bash
   npm run build
   php artisan serve
   ```

7. **Akses aplikasi** di `http://127.0.0.1:8000`

## 🔐 Akun Demo

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| Admin | admin@agrowaste.com | admin123  |
| User  | user@agrowaste.com  | user123   |

## 📁 Struktur Folder

```
AgroWaste/
├── app/
│   ├── Http/Controllers/
│   │   ├── Admin/          # Controller untuk admin
│   │   └── User/           # Controller untuk user
│   └── Models/             # Model Eloquent
├── resources/
│   └── js/
│       ├── Components/     # Komponen React reusable
│       ├── Layouts/        # Layout admin & user
│       └── Pages/          # Halaman React (Inertia)
├── routes/
│   ├── web.php             # Route utama
│   └── auth.php            # Route autentikasi
└── database/
    ├── migrations/         # File migrasi
    └── seeders/            # Data seeder
```

## 📸 Screenshot

### Landing Page
![Landing Page](docs/landing.png)

### User Dashboard
![User Dashboard](docs/dashboard.png)

### Admin Panel
![Admin Panel](docs/admin.png)

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:
1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).


---

<p align="center">
  <strong>🌱 Ubah Limbah Menjadi Peluang 🌱</strong>
</p>
