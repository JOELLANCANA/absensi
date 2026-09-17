# 🎓 Sistem Presensi QR Code UIN Ar-Raniry

Aplikasi presensi berbasis QR Code untuk acara Wisuda & Orasi Ilmiah UIN Ar-Raniry Banda Aceh.

## ✨ Fitur Utama

✅ **QR Code Scanner Real-time** - Scan peserta langsung dari kamera  
✅ **3 Opsi Presensi** - Hadir, Izin Keluar, Masuk Kembali  
✅ **Live Monitoring** - Lihat data presensi real-time  
✅ **Import/Export Excel** - Kelola data peserta  
✅ **Auto Generate QR** - Generate QR untuk semua peserta  
✅ **Laporan Terintegrasi** - Export & cetak laporan  
✅ **Mobile Responsive** - Bekerja di semua device  

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│         FRONTEND (Vercel)                               │
│  ├─ Scanner Interface (html5-qrcode)                   │
│  ├─ Modal 3 Tombol Aksi                                │
│  ├─ Data Peserta Management                            │
│  └─ Laporan & Export                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                HTTP API (POST)
                     │
┌────────────────────┴────────────────────────────────────┐
│      BACKEND (Google Apps Script)                       │
│  ├─ doPost() - API REST Endpoint                        │
│  ├─ getAllParticipants() - Ambil data                   │
│  ├─ markAttendance() - Catat presensi                   │
│  ├─ generateQRCode() - Generate QR                      │
│  └─ getAttendanceStats() - Statistik                    │
└────────────────────┬────────────────────────────────────┘
                     │
            Google Sheets API
                     │
┌────────────────────┴────────────────────────────────────┐
│      DATABASE (Google Spreadsheet)                      │
│  ├─ MASTERDATA (peserta & status)                      │
│  ├─ EVENT_CONFIG (konfigurasi acara)                   │
│  └─ ATTENDANCE_LOG (log presensi)                       │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Google Account
- GitHub Account
- Vercel Account (free)
- File Excel dengan data peserta

### 1️⃣ Setup Google Apps Script
```bash
1. Buka Spreadsheet di https://docs.google.com/spreadsheets/d/11q7bt212H_-l-CcklK-yygeigMQH8l-CBGihT1BGKHk/
2. Extensions → Apps Script
3. Copy-paste Code.gs
4. Deploy → Web App → Copy URL
```

### 2️⃣ Deploy ke Vercel
```bash
1. Push ke GitHub
2. Connect Vercel dengan GitHub
3. Deploy → Copy URL
```

### 3️⃣ Update Integration
```bash
1. Edit index.html
2. Ganti GAS_URL dengan URL dari Apps Script
3. Push ke GitHub → Vercel auto-redeploy
```

### 4️⃣ Import Data & Mulai
```bash
1. Buka aplikasi di Vercel
2. Tab Data Peserta → Import Excel
3. Generate QR Semua
4. Mulai scan!
```

👉 **Lihat `DEPLOYMENT_GUIDE.md` untuk panduan lengkap**

## 📋 File Structure

```
ABSENSI/
├── index.html                 # Frontend (deploy ke Vercel)
├── Code.gs                    # Backend (deploy ke GAS)
├── DEPLOYMENT_GUIDE.md        # Panduan deployment lengkap
├── README.md                  # File ini
└── data Wisudawan.xlsx        # Template data (optional)
```

## 🎯 Cara Kerja

### Alur Presensi:
1. **Panitia** membuka aplikasi di tablet/smartphone
2. **Kamera aktif** dan diarahkan ke QR Code peserta
3. **Scanning** → QR terdeteksi
4. **Modal** muncul dengan 3 opsi:
   - ✅ **Hadir Kegiatan** - Peserta hadir di lokasi
   - 🚪 **Izin Keluar Gedung** - Peserta perlu keluar sementara
   - 🚪 **Masuk Kembali** - Peserta kembali masuk
5. **Data tersimpan** otomatis di Spreadsheet
6. **Real-time update** di Live Table monitoring

### Alur Admin:
1. **Import data** peserta dari Excel
2. **Generate QR** untuk semua peserta
3. **Download/Cetak** QR Cards
4. **Bagikan QR** ke peserta sebelum acara
5. **Pantau laporan** real-time selama acara
6. **Export & cetak** laporan resmi setelah selesai

## 📊 Database Schema

### MASTERDATA Sheet
```
NIM | Nama | Fakultas | Prodi | Instansi | QR_URL | Status | Keluar-Masuk | Waktu_Presensi
```

### EVENT_CONFIG Sheet
```
Field | Value
Title | Wisuda & Orasi Ilmiah UIN Ar-Raniry
Date  | Senin, 20 Oktober 2026
Time  | 08.00 - 12.00 WIB
Location | Gedung Auditorium Ali Hasjmy
Status | AKTIF
AdminPassword | admin123
```

### ATTENDANCE_LOG Sheet
```
Timestamp | NIM | Nama | Status_Scan | Aksi_Panitia | Catatan
```

## 🔧 Customization

### Ubah Warna & Tema
Edit bagian CSS di `index.html`:
```css
--uin-green: #006338;      /* Warna utama */
--uin-gold: #D4AF37;       /* Accent color */
```

### Ubah Konfigurasi Acara
Di `Code.gs`, edit:
```javascript
var DEFAULT_EVENT = {
  title: "Judul Acara Anda",
  date: "Hari, Tanggal Bulan Tahun",
  time: "Jam - Jam WIB",
  location: "Lokasi Acara",
  status: "AKTIF",
  password: "sandi_anda"
};
```

### Tambah Field Baru
1. Edit struktur MASTERDATA di Spreadsheet
2. Update Code.gs untuk handle field baru
3. Update UI di index.html

## 🐛 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| GAS URL tidak merespons | Cek URL Apps Script, pastikan deployed sebagai Web App |
| Data tidak muncul | Refresh page, cek console (F12) untuk error |
| Kamera tidak bekerja | Pastikan izin kamera diberikan, gunakan HTTPS |
| QR scan lambat | Improve lighting, letakkan QR lebih dekat ke kamera |
| Data tidak sync | Check spreadsheet permissions, pastikan internet stabil |

## 📱 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |
| Mobile | ✅ Mobile responsive |

## 🔐 Security Notes

⚠️ **Jangan share** GAS URL public  
⚠️ **Jangan expose** Spreadsheet ID di kode  
⚠️ **Ganti password** default di EVENT_CONFIG  
⚠️ **Backup** Spreadsheet secara berkala  

## 📞 Support & Documentation

- **Panduan Lengkap**: Baca `DEPLOYMENT_GUIDE.md`
- **Quick Setup**: Ikuti instruksi di atas
- **Troubleshooting**: Lihat bagian Troubleshooting atau console (F12)

## 🤝 Contributing

Untuk improvement atau bug report:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📄 License

Dibuat untuk UIN Ar-Raniry Banda Aceh

## ✍️ Author

Developed for Wisuda & Orasi Ilmiah UIN Ar-Raniry 2026

---

**Ready to deploy? Follow DEPLOYMENT_GUIDE.md step-by-step! 🚀**
