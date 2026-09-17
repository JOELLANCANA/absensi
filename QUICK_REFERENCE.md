# 🎯 QUICK REFERENCE CARD - Sistem Presensi QR Code

**Panduan cepat untuk admin/panitia. Print atau screenshot untuk reference saat hari H.**

---

## 🔐 LOGIN

```
URL: https://absensi-qr-code-xxx.vercel.app/
Password: 1122
```

---

## 📱 MENU UTAMA (5 TABS)

### 1️⃣ DASHBOARD
- **Lihat:** Total peserta, Hadir, Izin Keluar, Belum Hadir
- **Aksi:** Refresh data, monitor stats real-time

### 2️⃣ INPUT DATA
- **Lihat:** Daftar peserta yang sudah diinput
- **Aksi:** Import Excel, Hapus peserta, Hapus semua

### 3️⃣ SCANNER QR CODE
- **Lihat:** Real-time scanner + manual input
- **Aksi:** Scan QR, pilih status (Hadir/Izin/Masuk), confirm

### 4️⃣ KARTU QR
- **Lihat:** Preview semua kartu QR (85×54mm)
- **Aksi:** Generate, print, distribute ke peserta

### 5️⃣ LAPORAN KEHADIRAN
- **Lihat:** Tabel lengkap presensi semua peserta
- **Aksi:** Export Excel, Export PDF, Cetak

---

## ⚡ HOTKEY SHORTCUTS (Optional)

```
[Ctrl + L] = Logout
[Ctrl + E] = Export Excel
[Ctrl + P] = Print/PDF
```

---

## 🚀 QUICK START (7 LANGKAH)

### SEBELUM HARI H

**STEP 1: Siapkan Data Excel**
- Kolom: No | NIM | Nama | Fakultas | Program Studi
- Save: `peserta_wisuda.xlsx`

**STEP 2: Import Data**
- Tab "Input Data" → Pilih File → Select Excel → Import

**STEP 3: Generate Kartu QR**
- Tab "Kartu QR" → Generate & Cetak Kartu QR
- Tunggu sebentar...

**STEP 4: Cetak Kartu**
- Klik "Cetak Semua Kartu"
- Setting: Landscape, Kertas: Karton/Thick
- Cetak → Potong sesuai garis

**STEP 5: Siapkan Device Scanning**
- Tablet 10" (recommended) atau Smartphone
- Install Chrome/Firefox
- Test kamera + scanning

**STEP 6: Test Run**
- Scan 2-3 kartu
- Verifikasi data tercatat
- Cek laporan

**STEP 7: Go Live**
- Distribusi kartu ke peserta
- Aktivkan scanner
- Monitor dashboard

---

## 📊 HARI H - SCANNING PROCEDURE

### Peserta Datang

1. **Peserta menunjukkan kartu QR**
2. **Arahkan tablet ke kartu**
3. **Tunggu QR terdeteksi** (3-5 detik)
4. **Modal muncul dengan data**
5. **Pilih status:**
   - 🟢 **Hadir** = Datang, ikut kegiatan
   - 🟡 **Izin Keluar** = Keluar gedung
   - 🔵 **Masuk Kembali** = Kembali dari luar
6. **Klik Konfirmasi**
7. **Toast "Berhasil" muncul** ✅

### Jika Scanning Gagal

1. **Masukkan NIM** di kolom text
2. **Pilih status** yang sesuai
3. **Klik "Catat Presensi"**
4. **Konfirmasi** ✅

### Panitia Checking

- **Monitor dashboard** untuk live stats
- **Lihat data terbaru** di tabel
- **Refresh page** jika perlu (F5)

---

## 📋 LAPORAN - EXPORT & CETAK

### Excel (.xlsx)
```
Tab: Laporan → Tombol: Export Excel
File: Laporan_Presensi_[waktu].xlsx
Buka: Excel / Google Sheets / Numbers
```

### PDF (Official Report)
```
Tab: Laporan → Tombol: Unduh PDF
File: Laporan_Presensi_[waktu].pdf
Header: UIN Ar-Raniry logo
Footer: Tanda tangan, timestamp
```

### Direct Print
```
Tab: Laporan → Tombol: Cetak
Setting: Landscape (untuk tabel lebar)
Kertas: A4 70gsm
```

---

## 💡 TIPS & TRICKS

### Scanner Tips
- ✅ QR jarak optimal: **15-30cm**
- ✅ Cahaya cukup agar QR jelas
- ✅ Arah tegak lurus ke QR
- ✅ Jika blur, fokus camera
- ⚠️ Hindari cahaya langsung ke kamera (silau)

### Card Print Tips
- ✅ Gunakan kertas **karton/tebal** (agar tahan)
- ✅ Print mode **Landscape**
- ✅ Kualitas print: **High/Best**
- ✅ Potong dengan **cutter** atau **guillotine** (rapi)
- ✅ Ukuran final: **85mm × 54mm**

### Device Recommendations
- **Tablet 10"** (iPad Air / Samsung Galaxy Tab S) → Best untuk scanner
- **Smartphone** (iPhone 12+ / Pixel 6+) → OK tapi layar kecil
- **Desktop** (1920×1080) → Best untuk admin input data
- **WiFi** harus stabil, signal minimum **4 bar**

### Troubleshooting Quick Fix
| Problem | Solution |
|---------|----------|
| Scanner tidak terdeteksi | Beri permission akses camera di browser |
| QR tidak scan | Cek pencahayaan, jarak 15-30cm, fokus camera |
| Data tidak tampil | Refresh page (F5), cek localStorage |
| Export gagal | Check internet connection, try lagi |
| Browser crash | Close & reopen, clear cache jika perlu |

---

## 📊 STATUS COLORS & MEANINGS

```
🟢 HIJAU = Hadir (Di Lokasi)
   Peserta hadir dan berada di tempat acara

🟡 KUNING = Izin Keluar (Temporer)
   Peserta keluar gedung tapi masih dalam acara

🔵 BIRU = Masuk Kembali
   Peserta kembali setelah keluar sebelumnya

⚪ ABU-ABU = Belum Hadir
   Peserta belum di-scan sama sekali
```

---

## 📝 DATA FORMAT REFERENCE

### Excel Import Format
```
No | NIM | Nama | Fakultas | Program Studi
1  | 2190101093 | Ahmad Mujiburrahman | Syari'ah | Hukum Keluarga
2  | 2190202114 | Rahma Putriani | Tarbiyah | Bahasa Arab
3  | 2190303115 | Nur Muhammad | Humaniora | Sastra Arab
```

### QR Code Content
```
QR Code: NIM peserta (contoh: 2190101093)
Decoding: Automatic → Fetch peserta data
Result: Nama, Fakultas, Program Studi muncul
```

### Laporan Output
```
Column: No | NIM | Nama | Fakultas | Program Studi | Status | Keterangan | Waktu Scan
Format: CSV (Excel) / Table (PDF)
```

---

## 🔒 SECURITY NOTES

- ✅ Password: **1122** (protected)
- ✅ Data lokal di browser → **tidak upload ke internet**
- ✅ Logout saat selesai untuk security
- ✅ **Backup data** setiap jam dengan Export Excel
- ⚠️ Jangan clear browser cache saat hari H (data hilang!)

---

## 📞 EMERGENCY CONTACTS

**Jika ada masalah saat hari H:**

1. **Clear Browser Cache & Reload**
   ```
   [Ctrl + Shift + Delete] → Clear all → Reload (F5)
   ```

2. **Check Internet Connection**
   ```
   Cek WiFi signal, restart router jika perlu
   ```

3. **Check Browser Console**
   ```
   [F12] → Console tab → lihat error message
   ```

4. **Restart Browser**
   ```
   Close tab → Close browser → Reopen
   ```

5. **Switch Device**
   ```
   Pindah ke device lain jika tetap error
   ```

6. **Contact Developer**
   ```
   [Developer contact info]
   ```

---

## 📋 PRE-LAUNCH CHECKLIST (Hari H Morning)

- [ ] Internet connection ✅ (test WiFi)
- [ ] Device battery full ✅ (charge tablet/phone)
- [ ] Kartu QR sudah dicetak ✅
- [ ] Printer siap (jika perlu print laporan) ✅
- [ ] Device charging cable ready ✅
- [ ] Backup power bank ✅
- [ ] Aplikasi dibuka, login, test 1 scan ✅
- [ ] Dashboard stats tampil ✅
- [ ] Demo ke panitia lain ✅

---

## 📊 MONITOR STATS DURING EVENT

**Setiap 30 menit:**
- [ ] Lihat dashboard stats
- [ ] Compare dengan expected attendance
- [ ] Check untuk error/issues
- [ ] Backup data dengan Export Excel

**Akhir acara:**
- [ ] Stop scanning
- [ ] Export final laporan (Excel + PDF)
- [ ] Print official report
- [ ] Backup data final

---

## 🎉 SELESAI!

Sistem Presensi QR Code siap digunakan! 

**Support:** [Developer contact]  
**Version:** 1.0 Production Ready  
**Last Updated:** [tanggal]

---

**Print this card untuk reference saat hari H!** 📑

