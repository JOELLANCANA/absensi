# 🚀 PANDUAN DEPLOYMENT KE VERCEL

Panduan lengkap untuk deploy aplikasi Sistem Presensi QR Code ke Vercel (hosting gratis).

---

## 📋 PERSIAPAN

### Apa yang Dibutuhkan:
1. **File `index.html`** (aplikasi utama)
2. **Akun GitHub** (gratis, buat di https://github.com)
3. **Akun Vercel** (gratis, buat di https://vercel.com)
4. **Git** (terinstall di computer)

---

## STEP 1: Buat Repository GitHub

### A. Buat Akun GitHub (jika belum)
1. Buka https://github.com
2. Klik **Sign up**
3. Isi email, password, username
4. Verifikasi email
5. Done! ✅

### B. Buat Repository Baru
1. Login ke GitHub
2. Klik **New Repository** (tombol hijau di kiri atas)
3. Isi form:
   - **Repository name:** `absensi-qr-code` (atau nama lain)
   - **Description:** "Sistem Presensi QR Code UIN Ar-Raniry"
   - **Public** (untuk Vercel bisa akses)
   - Jangan centang "Initialize with README"
4. Klik **Create Repository**

**Contoh URL hasil:**
```
https://github.com/username-anda/absensi-qr-code
```

---

## STEP 2: Setup Git Lokal

### A. Buka PowerShell / Terminal

**Windows:**
- Tekan `Win + R`
- Ketik `powershell`
- Enter

**macOS/Linux:**
- Buka Terminal

### B. Navigate ke folder project

```powershell
cd "d:\WISUDA GEL 3\ABSENSI"
```

### C. Inisialisasi Git (kalau belum)

```powershell
git init
```

### D. Tambahkan file ke Git

```powershell
git add index.html
```

### E. Commit pertama

```powershell
git commit -m "Initial commit: Aplikasi Presensi QR Code"
```

### F. Setup remote repository

Ganti `username-anda` dan nama repository sesuai GitHub Anda:

```powershell
git remote add origin https://github.com/username-anda/absensi-qr-code.git
git branch -M main
git push -u origin main
```

**Masukkan GitHub password/token saat diminta.**

**Verifikasi:** Buka GitHub repo Anda → cek `index.html` sudah terupload ✅

---

## STEP 3: Deploy ke Vercel

### A. Buat Akun Vercel (jika belum)

1. Buka https://vercel.com
2. Klik **Sign Up**
3. Pilih **Continue with GitHub**
4. Authorize Vercel di GitHub
5. Done! ✅

### B. Import Project

1. Setelah login Vercel, klik **Add New Project**
2. Pilih **Import Git Repository**
3. Cari repository `absensi-qr-code`
4. Klik **Import**

### C. Konfigurasi Project

**Settings:**
- **Project Name:** `absensi-qr-code` (atau nama lain)
- **Framework:** Pilih **Other** (bukan framework khusus)
- **Root Directory:** `.` (default)
- **Build Command:** (kosongkan, tidak perlu build)
- **Output Directory:** (kosongkan)
- **Environment Variables:** (skip, tidak perlu)

Klik **Deploy**

**Tunggu proses (~2-5 menit)**

### D. Selesai! ✅

Vercel akan memberikan URL seperti:
```
https://absensi-qr-code-<random>.vercel.app/
```

**Akses aplikasi:**
1. Buka URL di browser
2. Masukkan password: `1122`
3. Done! Aplikasi sudah live! 🎉

---

## STEP 4: Update Otomatis (Opsional)

### Setiap kali ada perubahan:

```powershell
# Edit file index.html
# ...

# Commit perubahan
git add index.html
git commit -m "Update: deskripsi perubahan"
git push origin main
```

**Vercel akan otomatis re-deploy dalam 1-2 menit** ✅

---

## 📝 CONTOH LENGKAP (Copy-Paste)

### Setup Pertama Kali:

```powershell
# 1. Navigate ke folder
cd "d:\WISUDA GEL 3\ABSENSI"

# 2. Initialize git
git init

# 3. Add file
git add index.html

# 4. Commit
git commit -m "Initial commit: Sistem Presensi QR Code UIN Ar-Raniry"

# 5. Add remote (ganti username-anda)
git remote add origin https://github.com/username-anda/absensi-qr-code.git

# 6. Setup branch dan push
git branch -M main
git push -u origin main
```

**Kemudian:**
1. Buka https://vercel.com
2. Login dengan GitHub
3. Click "Add New Project"
4. Select repository `absensi-qr-code`
5. Click "Import"
6. Scroll down, Click "Deploy"
7. Tunggu ~5 menit
8. Copy URL dan buka di browser ✅

---

## 🔗 URL PRODUCTION

Setelah deploy berhasil, URL Anda akan terlihat seperti:

```
https://absensi-qr-code-<random>.vercel.app
```

**Bagikan ke peserta/panitia** untuk akses aplikasi.

---

## ⚙️ CUSTOM DOMAIN (Opsional)

Jika ingin domain custom (misal: `absensi.uinrar.ac.id`):

1. Login Vercel
2. Buka project `absensi-qr-code`
3. Tab **Settings** → **Domains**
4. Click **Add**
5. Masukkan domain Anda
6. Follow instruksi DNS setup

(Memerlukan domain yang sudah Anda miliki)

---

## 🐛 TROUBLESHOOTING

### Deploy gagal?

**Error: "Cannot find module"**
- File `index.html` tidak terupload ke GitHub
- Solusi: Pastikan `git push` berhasil, cek GitHub repo

**Error: "Build failed"**
- Kemungkinan ada karakter aneh di filename
- Solusi: Gunakan nama file sederhana (contoh: `index.html`)

**Aplikasi blank / 404**
- File `index.html` tidak di root directory
- Solusi: Vercel perlu file `index.html` di folder utama

### Perubahan tidak muncul setelah push?

- Tunggu 1-2 menit (Vercel sedang redeploy)
- Tekan `Ctrl+Shift+R` untuk hard refresh browser
- Cek status di Vercel dashboard

### QR scanning tidak bekerja di mobile?

- Browser perlu izin akses kamera
- Gunakan Chrome atau Firefox (bukan Safari)
- Pastikan HTTPS (Vercel otomatis HTTPS ✅)

---

## 📱 AKSES DARI MOBILE

URL yang sama bisa dibuka di **Android/iOS:**

1. Buka browser mobile (Chrome, Firefox)
2. Ketik URL Vercel: `https://absensi-qr-code-...vercel.app`
3. Izinkan akses kamera saat diminta
4. Scanning siap! ✅

**Tips:**
- Gunakan tablet 10" untuk scanner (lebih nyaman)
- Pastikan WiFi stabil
- Jangan minimize browser saat scanning

---

## ✅ CHECKLIST DEPLOYMENT

- [ ] GitHub account sudah dibuat
- [ ] Repository sudah dibuat di GitHub
- [ ] File `index.html` sudah di-push ke GitHub
- [ ] Vercel account sudah dibuat
- [ ] Project sudah di-import ke Vercel
- [ ] Deploy berhasil (status: Deployment successful)
- [ ] Akses URL dan test login (password: 1122)
- [ ] Test beberapa fitur (scanner, export, etc)
- [ ] Share URL ke pengguna

---

## 📞 SUPPORT

**Jika ada masalah:**

1. **Check Git status:**
   ```powershell
   git status
   git log
   ```

2. **Check Vercel logs:**
   - Login Vercel
   - Buka project
   - Tab **Deployments** → lihat error logs

3. **Cek browser console:**
   - Buka aplikasi
   - Tekan `F12` (DevTools)
   - Tab **Console** → lihat error messages

---

## 🎉 SELESAI!

Aplikasi sudah live di production! 🚀

URL aplikasi bisa dibagikan ke:
- Admin untuk manajemen data
- Panitia untuk scanning
- Peserta wisuda untuk referensi

---

**Next step:** 
1. Share URL ke semua pengguna
2. Test fitur secara menyeluruh
3. Backup data secara berkala dengan export Excel
4. Enjoy! 🎊

