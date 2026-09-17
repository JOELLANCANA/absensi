# 🧪 INTEGRATION TEST & VERIFICATION GUIDE

Panduan lengkap untuk memverifikasi bahwa sistem presensi QR Code bekerja dengan baik setelah deployment.

---

## ✅ PRE-DEPLOYMENT CHECKLIST

Sebelum testing, pastikan semua sudah selesai:

- [ ] Google Apps Script sudah di-deploy sebagai Web App
- [ ] Web App URL sudah di-copy
- [ ] index.html sudah di-update dengan URL GAS yang benar
- [ ] Frontend sudah di-deploy ke Vercel
- [ ] Vercel URL sudah accessible
- [ ] Google Spreadsheet sudah dibuat dengan 3 sheets (MASTERDATA, EVENT_CONFIG, ATTENDANCE_LOG)
- [ ] Spreadsheet sharing settings sudah benar (Anyone access)
- [ ] Data sample sudah diinput atau siap diimport

---

## 🔗 TESTING PHASE 1: Backend Connectivity

### Test 1.1: Verify GAS Web App Deployment

**Tujuan**: Pastikan Google Apps Script Web App bisa diakses

**Langkah:**
1. Copy URL Web App Apps Script Anda
2. Buka di browser baru (incognito mode)
3. Seharusnya muncul aplikasi presensi

**Expected Result:**
- ✅ Halaman index.html muncul dengan semua element
- ✅ Header UIN Ar-Raniry terlihat
- ✅ Tidak ada error di console

**Jika Gagal:**
- Cek URL - pastikan tidak ada typo
- Pastikan Web App di-deploy dengan "Who has access: Anyone"
- Cek Apps Script editor untuk syntax errors
- Lihat troubleshooting section di TROUBLESHOOTING.md

---

### Test 1.2: Test API Backend dengan Fetch

**Tujuan**: Pastikan API endpoint GAS merespons dengan benar

**Langkah:**

1. Buka browser developer tools (F12)
2. Buka tab **Console**
3. Copy-paste kode ini:

```javascript
const GAS_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercontent';

// Test 1: getAllParticipants
fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'getAllParticipants' })
})
.then(r => r.json())
.then(d => {
    console.log('=== GET ALL PARTICIPANTS ===');
    console.log('Success:', d.success);
    console.log('Data count:', d.data ? d.data.length : 0);
    console.table(d.data ? d.data.slice(0, 3) : []);
    return d;
})
.catch(e => console.error('Error:', e));
```

**Expected Result:**
```
=== GET ALL PARTICIPANTS ===
Success: true
Data count: 5
(table showing first 3 participants)
```

**Jika Gagal:**
- Error message muncul? = Jalankan test 1.1 dulu
- `success: false`? = Cek SPREADSHEET_ID atau sheet names
- Timeout? = Cek internet connection, atau GAS sedang error

---

### Test 1.3: Test Event Config Endpoint

**Tujuan**: Pastikan konfigurasi acara bisa diambil

**Langkah:**

1. Di Console yang sama, jalankan:

```javascript
fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'getEventConfig' })
})
.then(r => r.json())
.then(d => {
    console.log('=== EVENT CONFIG ===');
    console.log(d.data);
})
.catch(e => console.error('Error:', e));
```

**Expected Result:**
```
=== EVENT CONFIG ===
{
    title: "Wisuda & Orasi Ilmiah UIN Ar-Raniry",
    date: "Senin, 20 Oktober 2026",
    time: "08.00 - 12.00 WIB",
    location: "Gedung Auditorium Ali Hasjmy",
    status: "AKTIF"
}
```

**Jika Gagal:**
- Cek EVENT_CONFIG sheet ada di spreadsheet
- Verifikasi format data di EVENT_CONFIG sheet

---

### Test 1.4: Test Mark Attendance Endpoint

**Tujuan**: Pastikan presensi bisa dicatat ke backend

**Langkah:**

1. Pastikan ada data peserta dengan NIM "2190101093" di MASTERDATA
2. Di Console, jalankan:

```javascript
fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'markAttendance',
        id: '2190101093',
        scanMode: 'HADIR'
    })
})
.then(r => r.json())
.then(d => {
    console.log('=== MARK ATTENDANCE ===');
    console.log('Success:', d.success);
    console.log('Message:', d.message);
    console.log('Data:', d.data);
})
.catch(e => console.error('Error:', e));
```

**Expected Result:**
```
=== MARK ATTENDANCE ===
Success: true
Message: "✅ Presensi (HADIR) berhasil dicatat untuk [NAMA]"
Data: {id: "2190101093", nama: "...", status: "HADIR", ...}
```

**Verification di Spreadsheet:**
- Buka MASTERDATA sheet di Spreadsheet
- Cari row dengan NIM 2190101093
- Kolom G (Status) harus berubah menjadi "HADIR"
- Kolom I (Waktu) harus ada timestamp

**Jika Gagal:**
- NIM tidak ditemukan? = Input data peserta dulu
- Kolom tidak update? = Cek spreadsheet permissions

---

## 🔗 TESTING PHASE 2: Frontend Functionality

### Test 2.1: Load Data ke Frontend

**Tujuan**: Frontend bisa fetch & menampilkan data dari backend

**Langkah:**

1. Buka aplikasi Vercel: `https://wisuda-absensi.vercel.app`
2. Pergi ke tab **Data Peserta**
3. Tunggu halaman load sepenuhnya

**Expected Result:**
- ✅ Tabel Data Peserta menampilkan list peserta
- ✅ Kolom: No, NIM, Nama, Fakultas/Prodi, Status, Aksi
- ✅ Minimal 5 baris data (dari sample atau import)

**Troubleshooting:**
- Tabel kosong? 
  - Buka Console (F12), cari error messages
  - Cek apakah GAS_URL sudah di-update di index.html
  - Jalankan test 1.2 untuk verify backend

---

### Test 2.2: Import Excel Data

**Tujuan**: Frontend bisa import data peserta dari file Excel

**Langkah:**

1. Siapkan file Excel dengan struktur:
   ```
   NIM | Nama Lengkap | Fakultas | Program Studi
   2190301001 | Ahmad Syauqi | Ushuluddin | Ilmu Al-Quran
   2190301002 | Siti Maulidah | Ushuluddin | Sosiologi Agama
   ```

2. Buka tab **Data Peserta**
3. Klik tombol **Import Excel**
4. Pilih file Excel
5. Tunggu import complete

**Expected Result:**
- ✅ Data muncul di tabel
- ✅ Jumlah peserta bertambah
- ✅ Toast notification: "Data Excel berhasil diimpor"
- ✅ Spreadsheet MASTERDATA ter-update (buka manual untuk verifikasi)

**Troubleshooting:**
- Import tidak bekerja?
  - Cek file format (.xlsx atau .csv)
  - Verifikasi kolom header
  - Buka Console untuk error messages
- Data tidak muncul di Spreadsheet?
  - Cek data baru ada di MASTERDATA sheet
  - Refresh Spreadsheet (Ctrl+F5)

---

### Test 2.3: Generate QR Codes

**Tujuan**: Frontend bisa generate QR Code untuk setiap peserta

**Langkah:**

1. Di tab **Data Peserta**
2. Klik tombol **Generate QR Semua**
3. Tunggu beberapa detik

**Expected Result:**
- ✅ Toast: "QR Code semua peserta berhasil di-generate"
- ✅ Tombol **Download** pada setiap row bisa diklik

**Verification:**
1. Klik tombol download di salah satu row
2. Seharusnya download image file QR Code
3. Buka image → seharusnya terlihat QR Code

**Troubleshooting:**
- Tombol download tidak bekerja?
  - Buka Console, cari error
  - Pastikan QR generation API (qrserver) accessible
  - Cek internet connection

---

### Test 2.4: Camera Access & QR Scanner

**Tujuan**: Frontend bisa access camera dan scan QR Code

**Langkah:**

1. Buka tab **Scanner**
2. Klik tombol **Aktifkan Kamera**
3. Browser akan minta permission → Klik **Allow**
4. Tunggu camera stream muncul

**Expected Result:**
- ✅ Camera preview muncul di scanning area
- ✅ Live video dari camera terlihat
- ✅ Tombol berubah jadi **Matikan Kamera**

**Troubleshooting:**
- Kamera tidak muncul?
  - Cek F12 Console untuk error messages
  - Cek browser support (gunakan Chrome/Firefox)
  - Pastikan device punya camera
  - Beri permission "Always allow camera" di browser settings
  - Cek HTTPS (Vercel otomatis HTTPS)

---

### Test 2.5: QR Code Scanning

**Tujuan**: Frontend bisa scan QR Code dan deteksi data peserta

**Setup:**
1. Print atau tampilkan salah satu QR Code di monitor/laptop lain
2. Atau generate QR online: https://www.qr-code-generator.com/
3. Pastikan Format: `NIM|NAMA` (contoh: `2190101093|Ahmad Mujiburrahman`)

**Langkah:**

1. Tab Scanner → Aktifkan Kamera
2. Arahkan camera ke QR Code
3. Jaga steady selama 2-3 detik
4. Tunggu scan terdeteksi

**Expected Result:**
- ✅ Modal popup muncul dengan detail peserta
- ✅ Tampil:
  - Nama peserta
  - NIM
  - Fakultas / Prodi
- ✅ 3 tombol aksi muncul: Hadir, Izin Keluar, Masuk Kembali

**Troubleshooting:**
- QR tidak terdeteksi?
  - Cek QR code clarity (tidak blur/rusak)
  - Improvement lighting
  - Cek jarak optimal (15-30cm)
  - Clean camera lens
  - Scan lebih lambat/steady
  - Lihat Testing Phase 1 untuk verify scanner library

---

### Test 2.6: Submit Attendance Action

**Tujuan**: Frontend bisa kirim data presensi ke backend

**Langkah:**

1. Setelah modal popup (dari Test 2.5)
2. Klik salah satu tombol: **Hadir Kegiatan**
3. Tunggu response dari backend

**Expected Result:**
- ✅ Modal tertutup otomatis
- ✅ Toast notification: "✅ Presensi (HADIR) berhasil dicatat..."
- ✅ Data muncul di Live Table dengan status "DI LOKASI"
- ✅ Timestamp otomatis tercatat

**Backend Verification:**
1. Buka Google Spreadsheet → MASTERDATA sheet
2. Cari row peserta yang di-scan
3. Verifikasi:
   - Kolom G (Status): HADIR
   - Kolom H (Keluar-Masuk): DI LOKASI
   - Kolom I (Waktu): timestamp terisi

**Troubleshooting:**
- Data tidak sync ke Spreadsheet?
  - Lihat Test 1.4 untuk verify backend API
  - Cek Spreadsheet permissions
  - Refresh Spreadsheet (Ctrl+F5)
- Error response dari backend?
  - Lihat error message di toast/console
  - Verifikasi NIM ada di MASTERDATA
  - Check backend logs

---

### Test 2.7: Live Table Update

**Tujuan**: Live table otomatis update dengan data presensi terbaru

**Langkah:**

1. Tab Scanner tetap buka
2. Scan beberapa QR Code dengan aksi berbeda:
   - 1x Hadir
   - 1x Izin Keluar
   - 1x Masuk Kembali
3. Perhatikan Live Table di bawah camera preview

**Expected Result:**
- ✅ Setiap scan, row baru muncul di Live Table
- ✅ Kolom Status menunjukkan aksi yang dipilih
- ✅ Badge warna berbeda per aksi:
   - Hijau = DI LOKASI (Hadir)
   - Kuning = KELUAR (Izin Keluar)
   - Biru = MASUK KEMBALI

---

### Test 2.8: Manual Search

**Tujuan**: Frontend bisa search peserta by NIM manually (tanpa scan)

**Langkah:**

1. Tab Scanner
2. Scroll ke section "Input Manual NIM / ID"
3. Masukkan NIM: `2190101093`
4. Klik tombol **Cari**

**Expected Result:**
- ✅ Modal popup muncul dengan detail peserta
- ✅ Form siap untuk select aksi presensi

**Troubleshooting:**
- NIM tidak ditemukan?
  - Verifikasi NIM ada di database
  - Cek huruf besar/kecil case sensitivity
  - Input tanpa spasi

---

## 📊 TESTING PHASE 3: Data Consistency & Reporting

### Test 3.1: Export to Excel

**Tujuan**: Data bisa di-export ke Excel untuk laporan

**Langkah:**

1. Buka tab **Laporan**
2. Klik tombol **Export Excel**
3. File akan auto-download

**Expected Result:**
- ✅ File `Laporan_Presensi.xlsx` ter-download
- ✅ Buka file:
  - Sheet ada dengan nama "Laporan"
  - Kolom: No, NIM, Nama, Fakultas, Prodi, Status, Keluar/Masuk, Waktu
  - Data terisi sesuai dengan presensi yang sudah dilakukan

---

### Test 3.2: Print Laporan

**Tujuan**: Laporan bisa dicetak dengan format professional

**Langkah:**

1. Tab **Laporan**
2. Klik tombol **Cetak**
3. Print dialog muncul
4. Klik **Print**

**Expected Result:**
- ✅ Print preview muncul dengan format professional
- ✅ Kop surat UIN Ar-Raniry terlihat
- ✅ Data peserta dalam tabel format resmi
- ✅ Siap dicetak ke printer

---

### Test 3.3: Verify Spreadsheet Data Integrity

**Tujuan**: Pastikan data di Spreadsheet konsisten dengan frontend

**Langkah:**

1. Buka Google Spreadsheet MASTERDATA sheet
2. Bandingkan dengan data di frontend Laporan tab
3. Cek beberapa row peserta yang sudah di-scan

**Expected Result:**
- ✅ NIM cocok
- ✅ Nama cocok
- ✅ Status presensi cocok
- ✅ Waktu tercatat di kolom I

**Jika Tidak Cocok:**
- Spreadsheet tidak auto-update? = Backend issue, lihat Test 1.4
- Frontend tidak sync? = Frontend issue, coba refresh (Ctrl+F5)

---

### Test 3.4: Stats Counter

**Tujuan**: Stats box di header menampilkan angka yang benar

**Bandingkan dengan:**
- **Total Peserta**: Count row di MASTERDATA (exclude header)
- **Hadir**: Count row dengan Status="HADIR" dan Keluar-Masuk="DI LOKASI"
- **Izin Keluar**: Count row dengan Keluar-Masuk="KELUAR"
- **Belum Hadir**: Count row dengan Status="BELUM HADIR"

**Expected Result:**
- ✅ Total cocok dengan jumlah data
- ✅ Sub-status total cocok dengan breakdown

---

## 🔄 TESTING PHASE 4: Edge Cases & Error Handling

### Test 4.1: Duplicate Scan

**Tujuan**: Sistem handle scan peserta yang sama 2x

**Langkah:**

1. Scan peserta A dengan aksi "Hadir"
2. Scan peserta A lagi dengan aksi "Izin Keluar"

**Expected Result:**
- ✅ Data update (Keluar-Masuk berubah jadi KELUAR)
- ✅ Timestamp update
- ✅ Live table update
- ✅ Tidak ada duplicate row

---

### Test 4.2: Invalid QR Code

**Tujuan**: Sistem handle QR invalid/corrupted

**Langkah:**

1. Generate random QR Code (bukan dari system)
2. Scan dengan camera

**Expected Result:**
- ✅ Modal tidak muncul
- ✅ Console mungkin ada error (OK)
- ✅ Aplikasi tetap berjalan normal

---

### Test 4.3: Slow Internet Connection

**Tujuan**: Sistem handle slow/unstable connection

**Langkah:**

1. Chrome DevTools → Network tab
2. Throttle ke "Slow 3G"
3. Coba scan & submit presensi
4. Coba import Excel
5. Coba export

**Expected Result:**
- ✅ Loading berjalan lebih lama (OK)
- ✅ Tidak crash atau error
- ✅ Data tetap tersimpan dengan benar
- ✅ Atau timeout error (acceptable)

**Restore Network:** Throttle kembali ke "No throttling"

---

### Test 4.4: Network Disconnection

**Tujuan**: Sistem handle offline scenario

**Langkah:**

1. Offline network (disconnect WiFi)
2. Coba submit presensi
3. Refresh page

**Expected Result:**
- ✅ Error message yang jelas
- ✅ Aplikasi tidak crash
- ✅ Reconnect saat network kembali

---

## 📋 TESTING PHASE 5: Cross-Device & Browser Testing

### Test 5.1: Desktop Browser

Test di 3+ browser:
- [ ] Google Chrome
- [ ] Mozilla Firefox
- [ ] Safari

**Expected Result:**
- ✅ Semua fitur bekerja di semua browser
- ✅ Layout responsive (sesuaikan window size)

---

### Test 5.2: Mobile Device

**Test di:**
- [ ] Android Phone (Chrome)
- [ ] iPhone (Safari)
- [ ] Tablet

**Expected Result:**
- ✅ Layout responsive
- ✅ Camera bekerja dengan baik
- ✅ Tap-to-scan lebih mudah daripada desktop

---

### Test 5.3: Tablet / iPad (Recommended untuk Panitia)

**Tujuan**: Tablet adalah device ideal untuk panitia scanner

**Test:**
1. Landscape & portrait orientation
2. Full-screen mode
3. Touch responsiveness

**Expected Result:**
- ✅ Optimal experience untuk scanning
- ✅ Touch buttons large enough & responsive

---

## 📊 FINAL VERIFICATION CHECKLIST

Sebelum dinyatakan "Ready for Production":

### Backend
- [ ] ✅ GAS Web App accessible
- [ ] ✅ getAllParticipants API works
- [ ] ✅ getEventConfig API works
- [ ] ✅ markAttendance API works
- [ ] ✅ Spreadsheet MASTERDATA ter-update saat scan
- [ ] ✅ ATTENDANCE_LOG mencatat setiap aksi

### Frontend
- [ ] ✅ Halaman load tanpa error
- [ ] ✅ GAS_URL sudah di-update dengan benar
- [ ] ✅ Tab: Scanner, Data Peserta, Laporan berfungsi

### Scanner Feature
- [ ] ✅ Camera bisa diaktifkan
- [ ] ✅ QR Code bisa di-scan
- [ ] ✅ Modal 3 tombol muncul setelah scan
- [ ] ✅ Aksi presensi (Hadir/Izin Keluar/Masuk Kembali) tersimpan

### Data Management
- [ ] ✅ Import Excel works
- [ ] ✅ QR generate untuk semua peserta works
- [ ] ✅ Export Excel works
- [ ] ✅ Laporan print works

### Integration
- [ ] ✅ Frontend ↔ Backend sync berjalan
- [ ] ✅ Data konsisten antara frontend & spreadsheet
- [ ] ✅ Real-time update berfungsi
- [ ] ✅ Error handling berjalan dengan baik

### Responsiveness
- [ ] ✅ Desktop view OK
- [ ] ✅ Tablet view OK
- [ ] ✅ Mobile view OK
- [ ] ✅ Touch interaction OK

### Browser Compatibility
- [ ] ✅ Chrome OK
- [ ] ✅ Firefox OK
- [ ] ✅ Safari OK
- [ ] ✅ Edge OK

### Edge Cases
- [ ] ✅ Duplicate scan handled correctly
- [ ] ✅ Invalid QR handled gracefully
- [ ] ✅ Slow connection handled
- [ ] ✅ Offline scenario handled

---

## 🎯 SIGN-OFF

Jika semua test ✅ Pass, sistem siap untuk production!

**Tested By:** ___________________  
**Date:** ___________________  
**Status:** ☐ PASS ☐ FAIL (jika fail, document issues)

---

## 📞 ISSUE TRACKING

Jika ada test yang FAIL:

1. **Document Issue**
   - Test case yang gagal
   - Expected vs Actual result
   - Steps to reproduce

2. **Debug**
   - Lihat TROUBLESHOOTING.md
   - Buka Console untuk error messages
   - Check backend logs

3. **Fix**
   - Edit kode yang bermasalah
   - Re-deploy (GAS & Vercel)
   - Re-test

4. **Sign-off**
   - Setelah fix, re-run test
   - Update status ke PASS

---

**Good luck! Semoga semua test PASS! 🚀**
