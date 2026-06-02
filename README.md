# 🌾 AgroWaste Academy

<p align="center">
  <strong>Platform Edukasi Pengelolaan Limbah Pertanian untuk Petani Indonesia</strong>
</p>

<p align="center">
  <a href="#tentang-proyek">Tentang</a> •
  <a href="#fitur-utama">Fitur</a> •
  <a href="#teknologi">Teknologi</a> •
  <a href="#instalasi">Instalasi</a> •
  <a href="#penggunaan">Penggunaan</a> •
  <a href="#struktur-proyek">Struktur</a>
</p>

---

## 📖 Tentang Proyek

**AgroWaste Academy** adalah platform pembelajaran digital yang dirancang khusus untuk membantu petani Indonesia mempelajari cara mengolah limbah pertanian menjadi produk bernilai ekonomi tinggi, seperti:

- 🌿 **Pupuk Organik** - Kompos dan pupuk cair dari sisa tanaman
- 🐄 **Pakan Ternak** - Olahan jerami dan limbah sayuran
- ♻️ **Produk Daur Ulang** - Briket, biogas, dan produk turunan lainnya

Platform ini menyediakan materi pembelajaran terstruktur dalam bentuk modul, video tutorial, dan kuis interaktif untuk mengevaluasi pemahaman pengguna.

---

## ✨ Fitur Utama

### 👤 Sistem Autentikasi
- Registrasi akun baru untuk petani
- Login dengan email dan password
- Manajemen profil pengguna (nama, telepon, alamat)
- Sistem role-based access (Admin & User)

### 📚 Modul Pembelajaran
- Materi pembelajaran terstruktur dengan level kesulitan (Beginner, Intermediate, Advanced)
- Konten dalam format teks dengan gambar pendukung
- Progress tracking untuk setiap modul
- Estimasi durasi belajar per modul

### 🎬 Video Edukasi
- Video tutorial step-by-step pengolahan limbah
- Terintegrasi dengan modul pembelajaran
- Dukungan video dari YouTube/URL eksternal
- Navigasi antar video dalam satu modul

### 📝 Kuis Interaktif
- Soal pilihan ganda dengan multiple options
- Sistem penilaian otomatis dengan passing score
- Riwayat percobaan kuis
- Timer/durasi pengerjaan kuis

### 📊 Progress Tracking
- Pencatatan kemajuan belajar per pengguna
- Status penyelesaian modul, video, dan kuis
- Dashboard progress pengguna

### ⚙️ Panel Admin
- Dashboard statistik (total user, modul, video, quiz)
- CRUD Modul Pembelajaran
- CRUD Video Edukasi
- CRUD Kuis dan Soal
- Manajemen Pengguna

---

## 🛠️ Teknologi

### Backend
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| PHP | ^8.2 | Bahasa pemrograman server-side |
| Laravel | 11.x | Framework PHP modern |
| MySQL | 5.7+ | Database relasional |
| Laravel Sanctum | 4.x | Autentikasi API |

### Frontend
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| React | 19.x | Library JavaScript untuk UI |
| Inertia.js | 2.x | Modern monolith SPA |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| Vite | 6.x | Build tool & dev server |

### Development Tools
| Tool | Deskripsi |
|------|-----------|
| Composer | PHP dependency manager |
| NPM | JavaScript package manager |
| Ziggy | Laravel route helper untuk JavaScript |

---

## 📋 Persyaratan Sistem

Sebelum instalasi, pastikan sistem Anda memiliki:

- **PHP** >= 8.2 dengan ekstensi:
  - BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
- **Composer** >= 2.0
- **Node.js** >= 18.x
- **NPM** >= 9.x
- **MySQL** >= 5.7 atau MariaDB >= 10.3
- **Git** (opsional, untuk clone repository)

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/IsmetMaulanaAzhari/AgroWaste.git
cd AgroWaste
```

Atau download ZIP dan ekstrak ke folder tujuan.

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### 3. Konfigurasi Environment

```bash
# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=agrowaste_academy
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 5. Buat Database

Buat database baru di MySQL:

```sql
CREATE DATABASE agrowaste_academy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Jalankan Migrasi & Seeder

```bash
# Jalankan migrasi untuk membuat tabel
php artisan migrate

# Jalankan seeder untuk data awal
php artisan db:seed

# Atau jalankan keduanya sekaligus
php artisan migrate:fresh --seed
```

### 7. Buat Storage Link

```bash
php artisan storage:link
```

---

## 💻 Penggunaan

### Menjalankan Aplikasi (Development)

Buka **dua terminal** terpisah:

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
```

Akses aplikasi di: **http://localhost:8000**

### Build untuk Production

```bash
npm run build
```

---

## 🔐 Akun Default

Setelah menjalankan seeder, tersedia akun berikut:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@agrowaste.com | admin123 |
| **User** | user@agrowaste.com | user123 |

> ⚠️ **Penting:** Ubah password default sebelum deploy ke production!

---

## 🗄️ Struktur Database

### Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────────┐
│   roles     │     │   users     │     │ user_module_progress│
├─────────────┤     ├─────────────┤     ├─────────────────────┤
│ id          │◄────│ role_id     │◄────│ user_id             │
│ name        │     │ id          │     │ module_id           │
│ description │     │ name        │     │ video_id            │
└─────────────┘     │ email       │     │ quiz_id             │
                    │ password    │     │ completed_at        │
                    │ phone       │     └─────────────────────┘
                    │ address     │              │
                    └─────────────┘              │
                                                 │
┌─────────────┐     ┌─────────────┐              │
│  modules    │     │   videos    │              │
├─────────────┤     ├─────────────┤              │
│ id          │◄────│ module_id   │◄─────────────┘
│ title       │     │ id          │
│ slug        │     │ title       │
│ description │     │ video_url   │
│ content     │     │ duration    │
│ level       │     │ order       │
│ order       │     └─────────────┘
│ is_active   │
└─────────────┘
       │
       ▼
┌─────────────┐     ┌────────────────┐     ┌─────────────────┐
│  quizzes    │     │ quiz_questions │     │  quiz_options   │
├─────────────┤     ├────────────────┤     ├─────────────────┤
│ id          │◄────│ quiz_id        │◄────│ question_id     │
│ module_id   │     │ id             │     │ id              │
│ title       │     │ question       │     │ option_text     │
│ description │     │ points         │     │ is_correct      │
│ passing_score     │ order          │     └─────────────────┘
│ duration    │     └────────────────┘
└─────────────┘
       │
       ▼
┌────────────────┐
│ quiz_attempts  │
├────────────────┤
│ id             │
│ user_id        │
│ quiz_id        │
│ score          │
│ passed         │
│ started_at     │
│ completed_at   │
└────────────────┘
```

### Daftar Tabel

| Tabel | Deskripsi |
|-------|-----------|
| `roles` | Daftar role pengguna (Admin, User) |
| `users` | Data pengguna terdaftar |
| `modules` | Modul pembelajaran |
| `videos` | Video edukasi per modul |
| `quizzes` | Data kuis per modul |
| `quiz_questions` | Soal-soal dalam kuis |
| `quiz_options` | Pilihan jawaban per soal |
| `quiz_attempts` | Riwayat percobaan kuis |
| `user_module_progress` | Progress belajar pengguna |

---

## 📁 Struktur Proyek

```
AgroWaste/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              # Controller untuk panel admin
│   │   │   │   ├── AdminDashboardController.php
│   │   │   │   ├── AdminModuleController.php
│   │   │   │   ├── AdminVideoController.php
│   │   │   │   ├── AdminQuizController.php
│   │   │   │   └── AdminUserController.php
│   │   │   ├── AuthController.php  # Autentikasi (login, register, logout)
│   │   │   ├── HomeController.php  # Landing page & dashboard
│   │   │   ├── ModuleController.php
│   │   │   ├── VideoController.php
│   │   │   └── QuizController.php
│   │   └── Middleware/
│   └── Models/                     # Eloquent models
│       ├── User.php
│       ├── Role.php
│       ├── Module.php
│       ├── Video.php
│       ├── Quiz.php
│       ├── QuizQuestion.php
│       ├── QuizOption.php
│       ├── QuizAttempt.php
│       └── UserModuleProgress.php
├── database/
│   ├── migrations/                 # Database migrations
│   └── seeders/
│       └── DatabaseSeeder.php      # Data awal aplikasi
├── resources/
│   ├── css/
│   │   └── app.css                 # Tailwind CSS entry
│   ├── js/
│   │   ├── app.jsx                 # React entry point
│   │   ├── Components/             # Reusable React components
│   │   ├── Layouts/                # Layout components
│   │   └── Pages/                  # Inertia page components
│   │       ├── Auth/               # Login, Register pages
│   │       ├── Modules/            # Module list & detail
│   │       ├── Videos/             # Video player pages
│   │       ├── Quizzes/            # Quiz pages
│   │       └── Profile/            # User profile
│   └── views/
│       └── app.blade.php           # Main Blade template
├── routes/
│   └── web.php                     # Web routes definition
├── public/                         # Public assets
├── .env                            # Environment configuration
├── composer.json                   # PHP dependencies
├── package.json                    # JS dependencies
├── tailwind.config.js              # Tailwind configuration
└── vite.config.js                  # Vite configuration
```

---

## 🛣️ Dokumentasi Routes

### Public Routes
| Method | URI | Deskripsi |
|--------|-----|-----------|
| GET | `/` | Landing page |
| GET | `/login` | Halaman login |
| POST | `/login` | Proses login |
| GET | `/register` | Halaman registrasi |
| POST | `/register` | Proses registrasi |
| POST | `/logout` | Proses logout |

### User Routes (Memerlukan Autentikasi)
| Method | URI | Deskripsi |
|--------|-----|-----------|
| GET | `/home` | Dashboard pengguna |
| GET | `/modules` | Daftar modul |
| GET | `/modules/{slug}` | Detail modul |
| POST | `/modules/{id}/complete` | Tandai modul selesai |
| GET | `/videos` | Daftar video |
| GET | `/videos/{id}` | Putar video |
| POST | `/videos/{id}/complete` | Tandai video selesai |
| GET | `/quizzes` | Daftar kuis |
| GET | `/quizzes/{id}` | Detail kuis |
| GET | `/quizzes/{id}/start` | Mulai kuis |
| POST | `/quizzes/{id}/submit` | Submit jawaban |
| GET | `/quizzes/result/{attemptId}` | Hasil kuis |
| GET | `/profile` | Halaman profil |
| PUT | `/profile` | Update profil |

### Admin Routes (Memerlukan Role Admin)
| Method | URI | Deskripsi |
|--------|-----|-----------|
| GET | `/admin/dashboard` | Dashboard admin |
| GET/POST/PUT/DELETE | `/admin/modules/*` | CRUD Modul |
| GET/POST/PUT/DELETE | `/admin/videos/*` | CRUD Video |
| GET/POST/PUT/DELETE | `/admin/quizzes/*` | CRUD Kuis |
| GET/POST/PUT/DELETE | `/admin/users/*` | CRUD User |

---

## 🔧 Troubleshooting

### Error: "Target class [DatabaseSeeder] does not exist"
```bash
composer dump-autoload
php artisan migrate:fresh --seed
```

### Error: "SQLSTATE[HY000] [1049] Unknown database"
Pastikan database `agrowaste_academy` sudah dibuat di MySQL.

### Error: "Vite manifest not found"
```bash
npm run build
# atau untuk development
npm run dev
```

### Error: "The Mix manifest does not exist"
Project ini menggunakan Vite, bukan Laravel Mix. Gunakan `npm run dev` atau `npm run build`.

### Halaman tidak ter-update setelah edit
Clear cache Laravel:
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```
