# 📋 PANDUAN DEPLOYMENT SISTEM PRESENSI QR CODE
## UIN Ar-Raniry Banda Aceh

---

## 📌 DAFTAR ISI
1. [Setup Google Apps Script](#setup-google-apps-script)
2. [Setup Google Spreadsheet](#setup-google-spreadsheet)
3. [Deploy ke Vercel](#deploy-ke-vercel)
4. [Integrasi Frontend-Backend](#integrasi-frontend-backend)
5. [Testing & Troubleshooting](#testing--troubleshooting)

---

## 🔧 SETUP GOOGLE APPS SCRIPT

### Langkah 1: Buka Google Apps Script Editor

1. Buka Google Spreadsheet Anda:
   - URL: `https://docs.google.com/spreadsheets/d/11q7bt212H_-l-CcklK-yygeigMQH8l-CBGihT1BGKHk/`

2. Klik menu **Extensions** → **Apps Script**

3. Akan membuka tab baru dengan Google Apps Script Editor

### Langkah 2: Ganti Kode di Code.gs

1. Di project Apps Script, hapus semua kode yang ada di `Code.gs`

2. Copy-paste seluruh kode dari file `Code.gs` lokal Anda ke editor

3. Ganti nilai `SPREADSHEET_ID` dengan ID Spreadsheet Anda:
   ```javascript
   var SPREADSHEET_ID = "11q7bt212H_-l-CcklK-yygeigMQH8l-CBGihT1BGKHk";
   ```

4. Klik tombol **Save** (Ctrl+S)

### Langkah 3: Deploy sebagai Web App

1. Di Apps Script Editor, klik **Deploy** (tombol biru di sebelah kanan)

2. Klik **New Deployment** (+)

3. Pilih **Type** → **Web app**

4. Isi form deployment:
   - **Execute as**: Pilih akun Google Anda
   - **Who has access**: Pilih "Anyone" (agar bisa diakses dari mana saja)

5. Klik **Deploy**

6. **COPY URL Web App** yang muncul (format: `https://script.google.com/macros/d/{DEPLOYMENT_ID}/usercontent`)
   - Ini akan digunakan di langkah integrasi

7. Jika ingin update kode:
   - Edit kode → Save → Klik Deploy → Pilih existing deployment → Update

---

## 📊 SETUP GOOGLE SPREADSHEET

### Langkah 1: Struktur Sheet

Google Spreadsheet Anda harus memiliki 3 sheet:

#### Sheet 1: `MASTERDATA` (Wajib)
Kolom:
- A: NIM / ID
- B: Nama Lengkap
- C: Fakultas
- D: Program Studi
- E: Instansi / Kontak
- F: URL QR Code
- G: Status Kehadiran
- H: Status Keluar-Masuk
- I: Waktu Presensi

**Format Contoh:**
```
NIM         | Nama              | Fakultas | Prodi                | Instansi       | URL QR | Status      | Keluar-Masuk | Waktu
2190101093  | AGUS DELVIANA    | Syari'ah | Hukum Keluarga      | UIN Ar-Raniry  |        | BELUM HADIR | -            | -
2190202114  | RAHMA PUTRIANIAA | Tarbiyah | Pendidikan Bahasa   | UIN Ar-Raniry  |        | BELUM HADIR | -            | -
```

#### Sheet 2: `EVENT_CONFIG` (Auto-created)
Kolom:
- A: Field
- B: Value

Berisi:
- Title | Wisuda & Orasi Ilmiah UIN Ar-Raniry
- Date | Senin, 20 Oktober 2026
- Time | 08.00 - 12.00 WIB
- Location | Gedung Auditorium Ali Hasjmy
- Status | AKTIF
- AdminPassword | admin123

#### Sheet 3: `ATTENDANCE_LOG` (Auto-created)
Kolom:
- A: Timestamp
- B: NIM
- C: Nama
- D: Status Scan
- E: Aksi Panitia
- F: Catatan

Menyimpan log setiap scan (auto-generate)

### Langkah 2: Import Data Wisudawan

1. Siapkan file Excel/CSV dengan kolom minimal:
   - NIM / ID
   - Nama Lengkap
   - Fakultas
   - Program Studi (Prodi)
   - Instansi / Kontak (opsional)

2. Buka aplikasi Web App di Vercel (lihat langkah Vercel)

3. Ke tab **Data Peserta**

4. Klik tombol **Import Excel**

5. Pilih file Excel/CSV Anda

6. Klik **Generate QR Semua** untuk auto-generate QR Code

---

## 🚀 DEPLOY KE VERCEL

### Langkah 1: Siapkan Repository GitHub

1. Install Git di komputer Anda (jika belum):
   - Download: https://git-scm.com/

2. Buat folder project:
   ```bash
   mkdir wisuda-absensi
   cd wisuda-absensi
   ```

3. Inisialisasi Git:
   ```bash
   git init
   ```

4. Copy file ke folder:
   - `index.html`
   - `Code.gs` (untuk referensi)
   - File lainnya yang diperlukan

5. Create `.gitignore`:
   ```
   node_modules/
   .env
   *.log
   ```

6. Commit file:
   ```bash
   git add .
   git commit -m "Initial commit: QR Code Attendance System"
   ```

7. Create repository di GitHub:
   - Buka https://github.com/new
   - Nama: `wisuda-absensi`
   - Klik **Create repository**

8. Push ke GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wisuda-absensi.git
   git push -u origin main
   ```

### Langkah 2: Deploy ke Vercel

1. Buka https://vercel.com

2. Klik **Sign Up** dan login dengan GitHub account

3. Klik **Add New...** → **Project**

4. Pilih repository `wisuda-absensi`

5. Konfigurasi:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (kosongkan)
   - **Output Directory**: ./

6. Klik **Deploy**

7. Tunggu sampai deployment selesai (biasanya 1-2 menit)

8. **COPY URL Vercel** yang muncul (format: `https://wisuda-absensi.vercel.app`)

---

## 🔗 INTEGRASI FRONTEND-BACKEND

### Langkah 1: Update URL di index.html

1. Buka `index.html` di text editor

2. Cari baris:
   ```javascript
   const GAS_URL = "https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercontent";
   ```

3. Ganti `YOUR_DEPLOYMENT_ID` dengan URL Web App dari Apps Script:
   - Contoh: `https://script.google.com/macros/d/1ABC123DEF456/usercontent`

4. Save file

5. Push ke GitHub:
   ```bash
   git add index.html
   git commit -m "Update GAS URL for integration"
   git push
   ```

6. Vercel akan auto-redeploy

### Langkah 2: Verifikasi Integrasi

1. Buka aplikasi di Vercel:
   - https://wisuda-absensi.vercel.app

2. Klik tab **Data Peserta**

3. Klik **Import Excel** dan upload file data

4. Verifikasi:
   - Data muncul di tabel
   - Tombol **Generate QR Semua** berfungsi
   - Bisa export ke Excel

---

## 🧪 TESTING & TROUBLESHOOTING

### Testing Checklist

- [ ] **Data Import**: File Excel bisa diimpor dengan benar
- [ ] **QR Generation**: QR Code bisa di-generate untuk setiap peserta
- [ ] **QR Scanner**: Kamera bisa mengakses dan scan QR Code
- [ ] **Modal Aksi**: Saat scan, 3 tombol (Hadir, Izin Keluar, Masuk Kembali) muncul
- [ ] **Attendance Recording**: Pilih aksi → data tersimpan & sync ke Spreadsheet
- [ ] **Live Table**: Data live table update real-time
- [ ] **Laporan**: Bisa export & cetak laporan
- [ ] **Manual Search**: Bisa search peserta by NIM

### Troubleshooting

#### ❌ Error: "GAS_URL is not responding"
**Solusi:**
- Pastikan URL Apps Script benar (cek step Deploy GAS)
- Pastikan Apps Script di-deploy sebagai "Web app" dengan akses "Anyone"
- Cek console browser (F12 → Console) untuk error details

#### ❌ Error: "Cannot read spreadsheet data"
**Solusi:**
- Pastikan SPREADSHEET_ID benar di Code.gs
- Pastikan Spreadsheet terbuka untuk akses (cek sharing settings)
- Pastikan sheet names tepat: MASTERDATA, EVENT_CONFIG, ATTENDANCE_LOG

#### ❌ QR Scanner tidak bekerja
**Solusi:**
- Pastikan browser support Camera (Chrome, Firefox, Safari)
- Beri izin akses kamera saat diminta
- Gunakan HTTPS (Vercel otomatis pakai HTTPS)
- Coba camera lain jika tersedia

#### ❌ Data tidak sync dari Spreadsheet
**Solusi:**
- Refresh browser (Ctrl+F5)
- Buka console (F12) dan cek error messages
- Pastikan internet connection stabil
- Deploy ulang di Apps Script jika ada perubahan kode

---

## 📱 MENGGUNAKAN SISTEM

### 1. Scanner Mode (Panitia)

1. Buka aplikasi di tablet/smartphone
2. Ke tab **Scanner**
3. Klik **Aktifkan Kamera**
4. Arahkan ke QR Code peserta
5. Pilih opsi: Hadir / Izin Keluar / Masuk Kembali
6. Data otomatis tersimpan & sync ke Spreadsheet

### 2. Input Manual

Jika QR tidak terbaca:
1. Ke tab **Scanner**
2. Masukkan NIM di kolom "Input Manual NIM / ID"
3. Klik **Cari**
4. Pilih opsi presensi yang sesuai

### 3. Kelola Data

- **Tab Data Peserta**: Lihat semua peserta, import Excel, generate QR
- **Tab Laporan**: Lihat statistik kehadiran, export Excel, cetak

---

## 🔐 KEAMANAN

- **Jangan share** URL Web App GAS kepada orang yang tidak berhak
- **Jangan expose** Spreadsheet ID di kode public
- **Ganti password** default (`admin123`) di EVENT_CONFIG sheet
- **Backup** Spreadsheet secara berkala

---

## 📞 SUPPORT

Jika ada masalah:
1. Cek console browser (F12)
2. Baca error messages
3. Ikuti troubleshooting guide di atas
4. Contact admin/developer

---

**Dibuat untuk UIN Ar-Raniry Banda Aceh**
**Dokumentasi v1.0 - September 2026**
