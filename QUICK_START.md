# ⚡ QUICK START - 15 MENIT SETUP

Panduan cepat untuk deploy sistem presensi QR Code dalam 15 menit.

---

## 📋 Prerequisite (Pastikan Sudah Ada)

✅ Google Account  
✅ GitHub Account  
✅ Vercel Account (login via GitHub)  
✅ File data peserta (Excel format)  

---

## 🚀 Step-by-Step Deployment

### STEP 1: Setup Google Apps Script (5 menit)

1. **Buka Spreadsheet:**
   ```
   https://docs.google.com/spreadsheets/d/11q7bt212H_-l-CcklK-yygeigMQH8l-CBGihT1BGKHk/
   ```

2. **Buka Apps Script:**
   - Klik **Extensions** → **Apps Script**

3. **Ganti Kode:**
   - Hapus semua kode di `Code.gs`
   - Copy-paste seluruh kode dari file `Code.gs` lokal Anda

4. **Save & Deploy:**
   - Klik **Save** (Ctrl+S)
   - Klik **Deploy** → **New Deployment**
   - Pilih type **Web app**
   - Execute as: Your Account
   - Who has access: **Anyone**
   - Klik **Deploy**

5. **Copy URL:**
   - Salin URL yang muncul
   - Format: `https://script.google.com/macros/d/{ID}/usercontent`
   - Simpan di tempat aman

---

### STEP 2: Setup GitHub & Deploy ke Vercel (5 menit)

1. **Siapkan File:**
   - Buka folder `ABSENSI`
   - Pastikan ada file:
     - `index.html` ✅
     - `Code.gs` ✅
     - `README.md` ✅
     - `DEPLOYMENT_GUIDE.md` ✅

2. **Update index.html:**
   - Buka `index.html` dengan text editor
   - Cari baris:
     ```javascript
     const GAS_URL = "https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercontent";
     ```
   - Ganti `YOUR_DEPLOYMENT_ID` dengan ID dari STEP 1
   - Contoh:
     ```javascript
     const GAS_URL = "https://script.google.com/macros/d/1ABC123DEF456/usercontent";
     ```
   - **Save**

3. **Push ke GitHub:**
   ```bash
   # Di terminal/PowerShell di folder ABSENSI
   git init
   git add .
   git commit -m "Initial QR Code Attendance System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wisuda-absensi.git
   git push -u origin main
   ```
   *(Ganti YOUR_USERNAME dengan username GitHub Anda)*

4. **Deploy di Vercel:**
   - Buka https://vercel.com
   - Klik **Add New...** → **Project**
   - Import repository `wisuda-absensi`
   - Settings biarkan default
   - Klik **Deploy**
   - Tunggu selesai (~1 menit)
   - Copy URL Vercel (format: `https://wisuda-absensi.vercel.app`)

---

### STEP 3: Import Data & Test (5 menit)

1. **Buka Aplikasi:**
   - Buka Vercel URL di browser
   - Seharusnya muncul interface presensi

2. **Import Data Peserta:**
   - Pergi ke tab **Data Peserta**
   - Klik **Import Excel**
   - Pilih file data peserta (format: NIM, Nama, Fakultas, Prodi)
   - Tunggu import complete

3. **Generate QR Code:**
   - Klik tombol **Generate QR Semua**
   - Tunggu selesai (~5 detik)

4. **Test Scanner:**
   - Pergi ke tab **Scanner**
   - Klik **Aktifkan Kamera**
   - Beri permission kamera saat diminta
   - Arahkan ke QR Code
   - Seharusnya modal muncul

✅ **DONE! Sistem ready to use.**

---

## 📝 Struktur File Final

```
wisuda-absensi/
├── index.html                    ← Frontend (deployed ke Vercel)
├── Code.gs                       ← Backend (deployed ke GAS)
├── README.md
├── QUICK_START.md               ← Anda di sini
├── DEPLOYMENT_GUIDE.md
├── TROUBLESHOOTING.md
├── INTEGRATION_TEST.md
├── .env.example
└── .gitignore
```

---

## 🎯 Cheat Sheet - URL Penting

**Google Apps Script ID:**
```
Ambil dari URL GAS Web App:
https://script.google.com/macros/d/{ID}/usercontent
                                  └─ INI ID ANDA
```

**Google Spreadsheet ID:**
```
https://docs.google.com/spreadsheets/d/{ID}/edit
                                      └─ INI ID ANDA
```

---

## 🔍 Verifikasi Cepat

Setelah deployment, cek:

| Komponen | Status | Cara Cek |
|----------|--------|----------|
| GAS Web App | ✅ | Buka URL GAS → Muncul interface |
| Frontend | ✅ | Buka URL Vercel → Muncul interface |
| Backend API | ✅ | F12 Console → Test fetch (lihat TROUBLESHOOTING.md) |
| Camera | ✅ | Tab Scanner → Aktifkan Kamera |
| QR Scan | ✅ | Scan QR peserta → Modal muncul |

---

## 🚨 Troubleshooting Cepat

### ❌ "GAS_URL not responding"
→ Update `const GAS_URL` di index.html dengan URL Apps Script yang benar

### ❌ "Data tidak muncul"
→ Cek Spreadsheet ID benar di Code.gs  
→ Cek sheet names: MASTERDATA, EVENT_CONFIG, ATTENDANCE_LOG  
→ Cek sharing settings: Anyone access

### ❌ "Kamera tidak bekerja"
→ Chrome/Firefox OK, IE tidak  
→ Beri permission kamera saat diminta  
→ HTTPS only (Vercel otomatis)

### ❌ "Masih error?"
→ Baca file `TROUBLESHOOTING.md` untuk detail

---

## 📞 Next Steps

Setelah berhasil:

1. **Customize untuk acara Anda**
   - Edit EVENT_CONFIG di Spreadsheet
   - Ganti title, date, time, location

2. **Siapkan Data Peserta**
   - Gunakan file Excel yang sudah ada
   - Import via tab Data Peserta

3. **Generate & Cetak QR**
   - Generate QR untuk semua peserta
   - Download untuk di-cetak atau di-bagikan digital

4. **Testing**
   - Ikuti INTEGRATION_TEST.md untuk full testing
   - Atau quick test: Scanner → Import → Generate → Scan

5. **Go Live!**
   - Panitia gunakan via tablet/smartphone
   - Scan QR setiap peserta yang hadir
   - Monitor real-time di Live Table

---

## 💡 Pro Tips

### 1. Smartphone vs Desktop untuk Scanning
**Smartphone/Tablet RECOMMENDED:**
- Camera lebih bagus
- Portable
- Touch interface natural
- Landscape mode ideal

**Desktop OK tapi:**
- Kamera built-in bisa kurang baik
- Less portable
- Perlu external camera untuk better result

### 2. Print QR Code Tips
- Print ukuran minimal 5x5 cm
- Black & white saja (warna tidak perlu)
- Laminating recommended untuk durability

### 3. Optimization
- Use tablet dengan screen besar (iPad Mini atau 10" Android)
- Landscape mode di tab Scanner
- Full screen mode (F11) untuk lebih fokus

### 4. Offline Mode
- Sistem ini require internet (GAS API call)
- Tidak ada offline mode
- Jika koneksi putus, data tidak tersimpan sampai reconnect

### 5. Security
- GAS_URL sensitive → Jangan share public
- Spreadsheet → Set sharing ke "Anyone" only jika trust
- Password default (`admin123`) → Ganti di EVENT_CONFIG sheet

---

## 📋 Deployment Checklist

- [ ] Google Apps Script deployed sebagai Web app
- [ ] Web app URL copied ke index.html
- [ ] index.html pushed ke GitHub
- [ ] Project deployed di Vercel
- [ ] Vercel URL accessible dari browser
- [ ] Data peserta di-import
- [ ] QR Code di-generate
- [ ] Camera testing berhasil
- [ ] Scan QR Code berhasil
- [ ] Modal 3 tombol muncul
- [ ] Presensi tersimpan di Spreadsheet

**Semua ✅? Selamat! Sistem ready to use! 🎉**

---

## 📞 Support

- **Quick Q&A**: Baca README.md
- **Detail Setup**: Lihat DEPLOYMENT_GUIDE.md
- **Error Solving**: Lihat TROUBLESHOOTING.md
- **Full Testing**: Lihat INTEGRATION_TEST.md

---

**Happy Deploying! 🚀**

Butuh bantuan? Baca dokumentasi lengkap atau jalankan INTEGRATION_TEST.md untuk verify.
