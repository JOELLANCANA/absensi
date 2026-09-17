# 🔧 TROUBLESHOOTING GUIDE - Sistem Presensi QR Code

Panduan lengkap mengatasi masalah yang mungkin terjadi saat menggunakan sistem.

---

## 🚨 MASALAH UMUM

### 1. ❌ "GAS_URL is not responding" / Tidak bisa connect ke backend

**Gejala:**
- Tombol import tidak bekerja
- Data tidak load
- Console error: `Failed to fetch from GAS`

**Solusi:**

1. **Cek URL Apps Script**
   - Buka `index.html`, cari baris:
   ```javascript
   const GAS_URL = "https://script.google.com/macros/d/...";
   ```
   - Pastikan URL lengkap dan benar
   - Cek tidak ada typo

2. **Verifikasi Web App Deployment**
   - Buka Google Apps Script dashboard
   - Klik **Deployments** (icon gembok)
   - Pastikan ada deployment dengan type "Web app"
   - Jika belum ada, deploy ulang:
     - Klik **New Deployment** (+)
     - Type: **Web app**
     - Execute as: Account Anda
     - Who has access: **Anyone**
     - Deploy → Copy URL

3. **Test URL dengan Browser**
   - Buka URL Apps Script langsung di browser
   - Seharusnya muncul halaman presensi
   - Jika error, cek message di browser

4. **Cek CORS Settings**
   - Di Apps Script, pastikan `.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)`
   - Ini allow cross-origin requests

5. **Ulang Deploy**
   ```
   - Apps Script → Deployments
   - Delete lama deployment (jika perlu)
   - Create new deployment
   - Update URL di index.html
   ```

---

### 2. ❌ "Cannot read spreadsheet data" / Data tidak load

**Gejala:**
- Halaman muncul tapi tabel kosong
- Tidak ada error di console
- Import excel tidak berhasil

**Solusi:**

1. **Cek Spreadsheet ID**
   - Di `Code.gs`, cek:
   ```javascript
   var SPREADSHEET_ID = "11q7bt212H_-l-CcklK-yygeigMQH8l-CBGihT1BGKHk";
   ```
   - ID harus sama dengan Spreadsheet Anda
   - Copy dari URL: `docs.google.com/spreadsheets/d/{ID}/edit`

2. **Verifikasi Sheet Names**
   - Spreadsheet harus punya 3 sheets:
     - **MASTERDATA** (exact name!)
     - **EVENT_CONFIG** (exact name!)
     - **ATTENDANCE_LOG** (exact name!)
   - Klik sheet tabs di bawah untuk verifikasi
   - Kalo belum ada, Apps Script akan auto-create saat pertama kali dijalankan

3. **Cek Sharing Permissions**
   - Buka Spreadsheet
   - Klik **Share** (kanan atas)
   - Pastikan **"Anyone"** bisa akses atau minimal authenticated users
   - Jangan set "Restricted"

4. **Verifikasi Header Kolom MASTERDATA**
   - Baris pertama harus punya header:
   ```
   NIM / ID | Nama Lengkap | Fakultas | Program Studi | Instansi | URL QR Code | Status | Status Keluar-Masuk | Waktu Presensi
   ```
   - Jika header hilang, Apps Script tidak bisa baca data

5. **Refresh & Clear Cache**
   - Buka DevTools (F12)
   - Network tab → Clear all
   - Close & reload page
   - Coba import data lagi

6. **Test dengan Manual API Call**
   - Buka DevTools (F12) → Console
   - Paste dan jalankan:
   ```javascript
   fetch('https://script.google.com/macros/d/YOUR_ID/usercontent', {
       method: 'POST',
       body: JSON.stringify({ action: 'getAllParticipants' })
   }).then(r => r.json()).then(d => console.log(d))
   ```
   - Lihat response untuk debugging

---

### 3. ❌ "Camera not working" / Kamera tidak bekerja

**Gejala:**
- Kamera placeholder muncul, klik aktifkan tapi black screen
- Error: `NotAllowedError`, `NotFoundError`
- Sudah pilih camera tapi tetap tidak bekerja

**Solusi:**

1. **Berikan Izin Kamera**
   - Browser akan minta permission "Allow camera access"
   - Klik **Allow** (bukan Block)
   - Jika sudah "Block", reset:
     - Chrome: Settings → Privacy → Site settings → Camera → Find domain → Allow
     - Firefox: Preferences → Privacy → Permissions → Camera → Allow
     - Safari: Preferences → Security → Allow camera

2. **Cek Browser Support**
   - Gunakan browser yang support `getUserMedia`:
     - ✅ Chrome/Chromium
     - ✅ Firefox
     - ✅ Safari (iOS 11+)
     - ✅ Edge
   - Hindari: Internet Explorer

3. **Pastikan HTTPS**
   - Kamera hanya bekerja di HTTPS
   - Vercel otomatis HTTPS ✅
   - Localhost OK untuk development
   - HTTP biasa NOT allowed ❌

4. **Gunakan Device yang Ada Kamera**
   - Cek device punya camera (desktop/tablet/phone)
   - Kamera harus tidak digunakan aplikasi lain
   - Contoh: Jangan buka Zoom bersamaan

5. **Pilih Camera yang Benar**
   - Dropdown "Pilih Perangkat Kamera" - buka list
   - Jika ada 2+ camera, pilih yang sesuai (rear/front)
   - Rear camera (belakang) lebih terang, lebih bagus untuk QR

6. **Test di Device Lain**
   - Jika desktop tidak bekerja, coba smartphone
   - Beberapa driver camera desktop bisa bermasalah
   - Smartphone lebih reliable

7. **Lighting & QR Code**
   - Pastikan lokasi cukup terang
   - QR Code harus jelas dan tidak blur
   - Jarak optimal 15-30 cm dari QR

---

### 4. ❌ "QR Scan tidak terdeteksi" / Scan tidak responsive

**Gejala:**
- Kamera aktif tapi scan tidak bekerja
- Arahkan ke QR tapi tidak ada response
- Kadang bekerja, kadang tidak

**Solusi:**

1. **Cek Kualitas QR Code**
   - QR harus jelas dan tidak blur
   - Jangan menggunakan QR yang rusak/tertekuk
   - QR ukuran minimal 5x5 cm untuk scan dari jauh

2. **Pencahayaan**
   - Scan di tempat terang (natural light lebih baik)
   - Hindari backlight (cahaya di belakang QR)
   - Jangan ada bayangan di QR

3. **Angle Scanning**
   - Arahkan kamera tepat ke QR (90 derajat)
   - Jangan terlalu miring
   - Keep steady sambil scan

4. **Jarak Optimal**
   - QR kecil (5cm): Jarak 10-20 cm
   - QR besar (10cm): Jarak 20-40 cm
   - Terlalu dekat atau jauh akan tidak terdeteksi

5. **Clean Camera Lens**
   - Lens kamera mungkin kotor/berdebu
   - Bersihkan dengan lembut menggunakan kain
   - Debu bisa sebabkan blur scanning

6. **Update Browser**
   - Teknologi scanning bisa improve di browser versi terbaru
   - Update ke versi latest browser Anda

7. **Test dengan QR Tester**
   - Generate QR test di: https://www.qr-code-generator.com/
   - Cek apakah library bisa detect QR apapun
   - Atau QR dari system sendiri tidak valid?

---

### 5. ❌ "Data tidak sync ke Spreadsheet" / Presensi tidak tersimpan

**Gejala:**
- Klik tombol presensi, modal tertutup tapi data tidak muncul
- Live table update tapi Spreadsheet tidak
- Excel export kosong atau lama

**Solusi:**

1. **Cek Response dari Backend**
   - Buka DevTools (F12) → Network tab
   - Klik tombol presensi
   - Lihat request ke GAS URL
   - Cek response (buka tab Response):
     - ✅ Success: `{"success": true, ...}`
     - ❌ Error: `{"success": false, "message": "..."}`

2. **Verifikasi Spreadsheet Permissions Lagi**
   - Spreadsheet → Share
   - Pastikan share setting benar
   - Try: Buka Spreadsheet di incognito/private mode
   - Bisa akses? Berarti permission OK

3. **Check Code.gs untuk Errors**
   - Apps Script → Editor
   - Klik tombol Execution log (ikon >)
   - Lihat ada error atau not
   - Common error:
     ```
     Error: "Sheet MASTERDATA not found"
     ```
     = Sheet name salah atau tidak ada

4. **Verifikasi MASTERDATA Sheet Format**
   - Buka MASTERDATA sheet
   - Row 1 harus header (bold, berwarna)
   - Data mulai dari row 2
   - Kolom A = NIM / ID (tidak boleh kosong)

5. **Test Mark Attendance Secara Manual**
   - DevTools → Console
   - Jalankan:
   ```javascript
   const testPayload = {
       action: 'markAttendance',
       id: '2190101093',  // ganti dengan NIM ada
       scanMode: 'HADIR'
   };
   
   fetch('https://script.google.com/macros/d/YOUR_ID/usercontent', {
       method: 'POST',
       body: JSON.stringify(testPayload)
   }).then(r => r.json()).then(d => console.log(d));
   ```
   - Cek response & Spreadsheet

6. **Apps Script Logging**
   - Tambahkan debug log di Code.gs:
   ```javascript
   Logger.log("Debugging info: " + participantId);
   ```
   - Jalankan, buka Execution log untuk lihat debug

7. **Rate Limit / Quota**
   - Jika scan terlalu cepat berturut-turut bisa hit limit
   - Tunggu beberapa detik antar scan
   - Spreadsheet punya API quota: 500 req/100 sec

---

### 6. ❌ "Import Excel Tidak Bekerja" / Data tidak masuk

**Gejala:**
- Klik "Import Excel", pilih file, tapi data tidak muncul
- Error atau silent fail
- File sudah diselect tapi nothing happen

**Solusi:**

1. **Verifikasi Format File**
   - File harus Excel (.xlsx) atau CSV (.csv)
   - Tidak support: .xls, .ods, .numbers, dll
   - Download ulang file jika corrupt

2. **Cek Kolom Excel**
   - File harus punya header:
   ```
   NIM / Nama Lengkap / Fakultas / Program Studi / Instansi (optional)
   ```
   - Nama kolom HARUS match (case-sensitive untuk 'Nama Lengkap' dll)
   - Tidak perlu semua kolom, tapi NIM & Nama wajib

3. **Data Format**
   - NIM: Text/Number (tidak boleh formula)
   - Nama: Text (bukan formula)
   - Hindari cell dengan color/format kompleks
   - Jangan ada merged cells

4. **Contoh Format Benar:**
   ```
   | NIM       | Nama Lengkap        | Fakultas  | Program Studi          |
   |-----------|---------------------|-----------|------------------------|
   | 2190101093| AGUS DELVIANA       | Syari'ah  | Hukum Keluarga        |
   | 2190202114| RAHMA PUTRIANIAA    | Tarbiyah  | Pendidikan Bahasa     |
   ```

5. **Test dengan File Kecil Dulu**
   - Jangan import 1000 rows sekaligus
   - Test dengan 5-10 rows
   - Jika berhasil, import yang besar

6. **Clear Browser Cache**
   - DevTools → Application → Clear storage
   - Close browser sepenuhnya
   - Reopen dan coba lagi

7. **Check Console untuk Error**
   - DevTools → Console
   - Cari error messages saat import
   - Copy error message untuk debugging

---

### 7. ❌ "Halaman Blank / Nothing Shows" / Aplikasi tidak load

**Gejala:**
- Buka URL tapi halaman white/blank
- atau hanya load infinite
- DevTools console penuh error

**Solusi:**

1. **Hard Refresh Browser**
   - Windows/Linux: Ctrl + F5 (clear cache + reload)
   - Mac: Cmd + Shift + R
   - Atau: DevTools → Network → Disable cache → Reload

2. **Check Internet Connection**
   - Pastikan connected ke internet
   - Test buka website lain (google.com)
   - Restart WiFi/router jika perlu

3. **Cek Vercel Deployment Status**
   - Buka https://vercel.com
   - Login & buka project
   - Cek "Deployments" tab
   - Status harus "Ready" (bukan "Building" atau "Error")
   - Jika error, re-deploy:
     ```bash
     git push origin main
     ```

4. **Cek Browser Console untuk Errors**
   - DevTools → Console tab
   - Lihat semua red error messages
   - Common errors:
     ```
     ReferenceError: GAS_URL is not defined
     = Update GAS_URL di index.html
     
     Uncaught SyntaxError
     = Ada typo di JavaScript code
     ```

5. **Test di Browser Lain**
   - Chrome tidak bekerja? Coba Firefox
   - Bisa bekerja di satu browser? = Browser-specific issue
   - Tidak bekerja semua browser? = Real issue

6. **Check Vercel Logs**
   - Vercel dashboard → project
   - Deployments → latest → View deployment
   - Lihat ada error atau not

7. **Manual Fetch Test**
   - DevTools → Console
   - Jalankan:
   ```javascript
   fetch('https://wisuda-absensi.vercel.app/index.html')
       .then(r => r.text())
       .then(t => console.log(t.substring(0, 100)))
   ```
   - Harus return HTML content

---

## 🔍 DEBUG TECHNIQUES

### 1. Gunakan Browser DevTools (F12)

**Console Tab** - Untuk JavaScript errors & logs
```javascript
// Log custom messages
console.log('Debug value:', value);
console.error('Error:', error);
console.table(data); // Tampil data as table
```

**Network Tab** - Untuk track API calls
- Filter: XHR (hanya AJAX requests)
- Klik request → lihat:
  - Request body (apa yang dikirim)
  - Response (apa yang diterima)
  - Status (200 = OK, 4xx = error)

**Application Tab** - Untuk localStorage/cache
- Lihat apa data yang disimpan
- Clear storage untuk fresh start

### 2. Test API Langsung

Buka console & paste:
```javascript
// Test getAllParticipants
fetch('https://script.google.com/macros/d/YOUR_ID/usercontent', {
    method: 'POST',
    body: JSON.stringify({ action: 'getAllParticipants' })
})
.then(r => r.json())
.then(d => {
    console.log('Success!', d);
    if (d.data) {
        console.table(d.data.slice(0, 5)); // Show first 5
    }
})
.catch(e => console.error('Error:', e));
```

### 3. Add Logging di Code.gs

Edit Code.gs & tambah logging:
```javascript
function getAllParticipants() {
    Logger.log('=== FETCHING PARTICIPANTS ===');
    Logger.log('Spreadsheet ID: ' + SPREADSHEET_ID);
    
    try {
        var sheet = getOrCreateSheet(SHEET_MASTERDATA);
        Logger.log('Sheet found: ' + SHEET_MASTERDATA);
        Logger.log('Last row: ' + sheet.getLastRow());
        
        var data = sheet.getDataRange().getValues();
        Logger.log('Rows fetched: ' + data.length);
        
        // ... rest of code
    } catch (e) {
        Logger.log('ERROR: ' + e.toString());
        return { success: false, message: e.toString(), data: [] };
    }
}
```

Kemudian lihat logs:
- Apps Script Editor → Execution log

### 4. Incremental Testing

Test sesuai urutan:
1. ✅ Bisa buka Vercel? (Network OK?)
2. ✅ Bisa buka Apps Script Web App? (GAS OK?)
3. ✅ Data bisa fetch? (API OK?)
4. ✅ Kamera bisa aktif? (Device OK?)
5. ✅ QR bisa scan? (Scanning OK?)
6. ✅ Data bisa simpan? (Backend OK?)

---

## 📞 GETTING MORE HELP

Jika masih stuck:

1. **Read Documentation**
   - DEPLOYMENT_GUIDE.md
   - README.md
   - Code comments

2. **Google Search**
   - "[Error message]" + "javascript"
   - "[Problem]" + "html5-qrcode"
   - "[Tech]" + "troubleshooting"

3. **Stack Overflow**
   - Search similar questions
   - Tag: javascript, qrcode, google-apps-script
   - Ask new question dengan:
     - Exact error message
     - Code snippet
     - Steps to reproduce
     - What you tried

4. **Documentation**
   - html5-qrcode: https://github.com/mebjas/html5-qrcode
   - Google Apps Script: https://developers.google.com/apps-script
   - Vercel: https://vercel.com/docs

5. **Contact Developer**
   - Share error message
   - Share DevTools console log
   - Provide steps to reproduce

---

**Semoga berhasil! Jangan panik, rata-rata ada solusi untuk setiap masalah 💪**
