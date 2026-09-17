# 📖 PANDUAN SINGKAT - Cara Menggunakan Sistem

---

## 🔐 STEP 1: LOGIN

1. Buka aplikasi `index.html`
2. Masukkan password: **1122**
3. Klik "Masuk Dashboard"
4. ✅ Berhasil login

---

## 📥 STEP 2: INPUT DATA PESERTA

1. Pergi ke tab **"Input Data"**
2. Siapkan file Excel dengan kolom: `No | NIM | Nama | Fakultas | Program Studi`
3. Klik **"Pilih File"** → Pilih file Excel
4. Klik **"Import"**
5. ✅ Data peserta sudah masuk

**Contoh format Excel:**
```
No   NIM         Nama                    Fakultas        Program Studi
1    2190101093  Ahmad Mujiburrahman    Syari'ah        Hukum Keluarga
2    2190202114  Rahma Putriani         Tarbiyah        Pendidikan Bahasa Arab
3    2190301001  Muhammad Farhan        Ushuluddin      Ilmu Al-Quran
```

---

## 🎫 STEP 3: GENERATE & CETAK KARTU QR

1. Pergi ke tab **"Kartu QR"**
2. Otomatis generate QR untuk semua peserta
3. Preview kartu muncul
4. Klik **"Cetak Semua Kartu"**
5. Dialog print muncul
6. Pilih printer → Klik **"Cetak"**
7. ✅ Kartu QR sudah dicetak

**Format kartu:**
- Ukuran: 85mm x 54mm (standar kartu)
- Berisi: No Urut, Nama, NIM, Fakultas, QR Code
- Siap untuk didistribusikan ke peserta

---

## 🎯 STEP 4: SCANNING QR SAAT ACARA

### Dengan Scanner/Kamera

1. Pergi ke tab **"Scanner QR Code"**
2. Klik **"Aktifkan Kamera"**
3. Beri izin akses kamera saat diminta
4. Arahkan kamera ke QR Code peserta
5. QR otomatis terdeteksi
6. Modal muncul dengan detail peserta
7. Pilih status: **Hadir Kegiatan** / **Izin Keluar Gedung** / **Masuk Kembali**
8. Klik **"Konfirmasi"**
9. ✅ Presensi berhasil tercatat

### Tanpa Scanner (Manual)

1. Ke tab **"Scanner QR Code"**
2. Masukkan NIM di kolom **"NIM Peserta"**
3. Pilih status presensi
4. Klik **"Catat Presensi"**
5. Klik **"Konfirmasi"**
6. ✅ Presensi tercatat

---

## 📊 STEP 5: MONITOR DASHBOARD

1. Pergi ke tab **"Dashboard"**
2. Lihat statistik real-time:
   - Total Peserta
   - Hadir
   - Izin Keluar
   - Belum Hadir
3. Live table menampilkan 5 scan terakhir
4. Auto-refresh saat ada presensi baru

---

## 📋 STEP 6: CETAK LAPORAN KEHADIRAN

### Option 1: Export ke Excel

1. Pergi ke tab **"Laporan"**
2. Klik **"Export Excel"**
3. File otomatis diunduh: `Laporan_Presensi_[timestamp].xlsx`
4. ✅ Buka di Excel / Google Sheets untuk analisis

### Option 2: Unduh PDF

1. Pergi ke tab **"Laporan"**
2. Klik **"Unduh PDF"**
3. File otomatis diunduh: `Laporan_Presensi_[timestamp].pdf`
4. ✅ Buka & cetak dari PDF

### Option 3: Cetak Langsung

1. Pergi ke tab **"Laporan"**
2. Klik **"Cetak"**
3. Dialog print browser muncul
4. Pilih printer → Atur setting
5. Klik **"Cetak"**
6. ✅ Laporan dicetak

---

## 💡 TIPS MENGGUNAKAN SISTEM

### General Tips
- ✅ Data tersimpan di browser local storage (aman & private)
- ✅ Backup data dengan export Excel/PDF setelah acara
- ✅ Jangan clear browser cache agar data tetap tersimpan
- ✅ Backup data berkala dengan export

### Scanning Tips
- ✅ Gunakan pencahayaan yang cukup
- ✅ Arahkan tegak lurus ke QR Code
- ✅ Jarak optimal: 15-30cm
- ✅ QR Code harus jelas, tidak blur
- ✅ Gunakan Chrome atau Firefox (tidak IE/Edge)

### Device Tips
- ✅ Tablet (iPad 10", Android 10") ideal untuk scanning
- ✅ Desktop untuk admin input data
- ✅ Smartphone bisa tapi kurang optimal untuk scanning
- ✅ Pastikan WiFi stabil selama acara

---

## 🔑 PASSWORD & SECURITY

**Admin Password:** `1122`

**Catatan:**
- Password hanya untuk masuk dashboard
- Tidak ada autentikasi data (proteksi interface saja)
- Data tetap di browser lokal (aman)
- Jika perlu ganti password, edit code di line yang berisi `ADMIN_PASSWORD = "1122"`

---

## 📱 DEVICE COMPATIBILITY

✅ Bekerja di:
- Windows / Mac / Linux Desktop
- iPad / Android Tablet
- iPhone / Android Phone

**Recommended:**
- Tablet 10" untuk scanning (optimal)
- Desktop untuk admin interface
- Mobile untuk emergency

---

## 🆘 TROUBLESHOOTING CEPAT

| Masalah | Solusi |
|---------|--------|
| **Login gagal** | Pastikan password `1122` benar |
| **Kamera tidak muncul** | Gunakan Chrome/Firefox, beri permission |
| **QR tidak scan** | Cek pencahayaan, jarak, QR jelas |
| **Data hilang** | Jangan clear cache browser |
| **Export gagal** | Refresh page, try again |
| **Kartu tidak cetak** | Klik Cetak lagi, pilih printer |

---

## ⚡ WORKFLOW HARI H

### 1. Persiapan (Sebelum acara)
```
✅ Test login password
✅ Cek data peserta sudah import
✅ Generate QR Code
✅ Cetak kartu QR
✅ Distribusi kartu ke peserta
✅ Test scanner QR (1-2x)
✅ Check device battery & WiFi
```

### 2. Selama Acara
```
✅ Panitia siap dengan scanner
✅ Peserta datang dengan kartu QR
✅ Scanner membaca QR
✅ Sistem catat status presensi
✅ Monitor dashboard real-time
```

### 3. Setelah Acara
```
✅ Export laporan Excel
✅ Unduh PDF laporan
✅ Cetak laporan resmi
✅ Backup data dengan download
✅ Close aplikasi
```

---

## 📞 HELP & SUPPORT

**Jika ada masalah:**

1. **Cek browser console (F12)** untuk error messages
2. **Read FITUR_BARU.md** untuk detail fitur
3. **Check TROUBLESHOOTING.md** untuk masalah spesifik
4. **Contact developer** jika perlu bantuan teknis

---

## ✅ QUICK CHECKLIST

Pastikan sudah:
- [ ] Bisa login dengan password 1122
- [ ] Data peserta sudah import
- [ ] QR Code sudah di-generate
- [ ] Kartu QR sudah dicetak
- [ ] Scanner bisa aktif & scan
- [ ] Status presensi bisa dicatat
- [ ] Dashboard menampilkan stats
- [ ] Laporan bisa di-export
- [ ] Data tersimpan setelah refresh page

---

## 🎉 READY TO USE!

Sistem sudah siap digunakan. Ikuti panduan di atas, dan semuanya akan berjalan lancar.

**Selamat menggunakan! 🚀**

---

*Dibuat untuk UIN Ar-Raniry - September 2026*
