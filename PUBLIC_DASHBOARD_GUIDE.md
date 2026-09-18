# 📊 PUBLIC DASHBOARD - Panduan Penggunaan

**File:** `public-dashboard.html`  
**Status:** ✅ Ready to Use  
**Access:** TANPA LOGIN - Public Access

---

## 🎯 TUJUAN

**Monitor Presensi Real-Time** yang bisa diakses oleh:
- ✅ Panitia (monitoring area publik)
- ✅ Peserta (cek status presensi)
- ✅ Siapa saja yang butuh monitor (tanpa login)
- ✅ Bisa ditampilkan di layar besar/TV (room monitor)

---

## 🌐 AKSES

### Local Development:
```
File: d:\WISUDA GEL 3\ABSENSI\public-dashboard.html
Buka: Klik 2x file → otomatis buka di browser
atau
Drag file ke browser
```

### Production (Vercel):
```
Admin Dashboard: https://absensi-qr-code-xxx.vercel.app/
Public Monitor:  https://absensi-qr-code-xxx.vercel.app/public-dashboard.html
```

---

## 📱 LAYOUT

### Header
```
[UIN AR-RANIRY Logo]
Monitor Presensi Wisuda 2026 - Real-Time
Auto-refresh setiap 5 detik
```

### Statistics Cards (3 Cards)
```
┌──────────────┬──────────────┬──────────────┐
│ Belum Scan   │ Izin Keluar  │ Masuk Kembali│
│     45       │      8       │      3       │
└──────────────┴──────────────┴──────────────┘
```

### Live Data Containers (3 Columns)

#### Column 1: Belum Scan (Red #dc3545)
```
┌─────────────────────────┐
│ ✗ BELUM SCAN            │
├─────────────────────────┤
│ • Ahmad Mujiburrahman   │
│   NIM: 2190101093       │
│                         │
│ • Rahma Putriani        │
│   NIM: 2190202114       │
│ + 43 peserta lainnya     │
└─────────────────────────┘
```

#### Column 2: Izin Keluar (Yellow #ffc107)
```
┌─────────────────────────┐
│ 🚪 IZIN KELUAR          │
├─────────────────────────┤
│ • Nur Muhammad          │
│   NIM: 2190303115       │
│   ⏰ 10:30 AM            │
│                         │
│ • Siti Nur'aini         │
│   NIM: 2190404116       │
│   ⏰ 10:45 AM            │
└─────────────────────────┘
```

#### Column 3: Masuk Kembali (Blue #17a2b8)
```
┌─────────────────────────┐
│ ← MASUK KEMBALI         │
├─────────────────────────┤
│ • Muhammad Rizki        │
│   NIM: 2190505117       │
│   ⏰ 11:00 AM            │
│                         │
│ (Belum ada yang kembali)│
└─────────────────────────┘
```

---

## ⚙️ FITUR

### ✅ Fitur yang Ada

1. **Auto-Refresh**
   - Update otomatis setiap 5 detik
   - Membaca data dari localStorage (shared dengan admin)
   - Tidak perlu manual refresh

2. **Real-Time Monitoring**
   - Live count peserta di setiap kategori
   - Peserta baru langsung tampil
   - Status update otomatis

3. **Responsive Design**
   - Desktop: 3 kolom side-by-side
   - Tablet: 2 kolom atau 1 kolom
   - Mobile: Full-width 1 kolom (vertical scroll)

4. **Mobile-Friendly**
   - Bisa diakses dari smartphone
   - Touch-friendly interface
   - Viewport optimization

5. **Public/Read-Only**
   - Tidak bisa edit/hapus data
   - Hanya bisa lihat
   - Cocok untuk panitia monitoring

### ❌ Fitur TIDAK Ada

- Login/password
- Export/Import
- Edit data
- Delete
- QR scanning
- Print laporan

---

## 📊 DATA SOURCE

### Dari Mana Data Berasal?

**localStorage** (shared dengan admin dashboard)
```javascript
localStorage.getItem('participants')
// Data: [
//   {
//     nim: "2190101093",
//     nama: "Ahmad Mujiburrahman",
//     fakultas: "Syari'ah",
//     prodi: "Hukum Keluarga",
//     status: "HADIR" (atau kosong jika belum scan),
//     keterangan: "Di Lokasi" | "Keluar" | "Masuk Kembali",
//     waktuScan: "17/09/2026, 10:30:45"
//   }
// ]
```

### Update Flow:

```
Admin Dashboard        Public Dashboard
     (Admin)                (Public)
        ↓                      ↑
   Scan QR             Read from localStorage
        ↓                      ↑
   Record Attendance        Auto-refresh
        ↓                      ↑
   Save to localStorage  Display Data
        ↓                      ↑
   ←──────────────────────────→
```

---

## 🚀 DEPLOYMENT

### Deploy ke Vercel

#### Step 1: Add File ke Git
```bash
cd "d:\WISUDA GEL 3\ABSENSI"
git add public-dashboard.html
git commit -m "Add: Public monitoring dashboard"
git push origin main
```

#### Step 2: Vercel Auto-Deploys
- Vercel detect changes
- Auto-deploy dalam 1-2 menit
- File tersedia di: `/public-dashboard.html`

#### Step 3: Access Production
```
https://absensi-qr-code-xxx.vercel.app/public-dashboard.html
```

---

## 💡 USE CASES

### 1️⃣ Room Monitor (Layar Besar)
```
Setup:
- Desktop/Laptop di ruang monitoring
- Buka public-dashboard.html di fullscreen
- Layar menampilkan real-time stats
- Panitia bisa lihat dari mana saja
```

### 2️⃣ Mobile Check-In
```
Setup:
- Peserta buka di smartphone
- Cek apakah sudah scan
- Cek status presensi
- Bisa dari mana saja
```

### 3️⃣ TV Broadcast
```
Setup:
- Hubungkan laptop ke TV
- Fullscreen public-dashboard.html
- Auto-refresh setiap 5 detik
- Real-time display di TV untuk peserta
```

### 4️⃣ Panitia Monitoring
```
Setup:
- Buka di tablet/laptop panitia
- Monitor 3 kategori utama
- Real-time update
- Tidak perlu login
```

---

## 🔧 CUSTOMIZATION

### Ubah Refresh Interval

**File:** public-dashboard.html (Line ~320)

```javascript
// Default: 5000ms (5 detik)
setInterval(() => {
    loadData();
}, 5000);  // ← Ubah ke 3000 (3 detik) atau 10000 (10 detik)
```

### Ubah Warna

**File:** public-dashboard.html (CSS Section)

```css
:root {
    --uin-green: #006338;      /* Primary color */
    --uin-dark: #0a2e1d;       /* Dark variant */
    --uin-gold: #D4AF37;       /* Accent */
}

/* Container colors */
.container-header.belum { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); }
.container-header.izin { background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%); }
.container-header.kembali { background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); }
```

### Tambah Kategori Baru

Jika ingin tambah kategori (misal "Hadir" atau "Lainnya"):

```html
<!-- Add new stat card -->
<div class="stat-card hadir">
    <div class="stat-label">Hadir</div>
    <div class="stat-number" id="count-hadir">0</div>
</div>

<!-- Add new container -->
<div class="container-box hadir">
    <div class="container-header hadir">
        <i class="fa-solid fa-check-circle"></i> Hadir
    </div>
    <div class="container-content" id="container-hadir"></div>
</div>

<!-- Add JavaScript logic -->
const hadir = participants.filter(p => p.keterangan === 'Di Lokasi').length;
document.getElementById('count-hadir').innerText = hadir;
// ... render logic
```

---

## 📋 TROUBLESHOOTING

### Data tidak muncul?

**Masalah:** Page menampilkan "Menunggu data..."  
**Solusi:**
1. Buka admin dashboard terlebih dahulu
2. Import data peserta
3. Baru buka public-dashboard.html
4. Data harus ada di localStorage

### Refresh terlalu cepat/lambat?

**Masalah:** Update terlalu frequent atau terlalu jarang  
**Solusi:** Ubah interval (lihat Customization di atas)

### Tampilan berantakan di mobile?

**Masalah:** Layout rusak  
**Solusi:** Clear browser cache (Ctrl+Shift+Del), reload

### Not accessible dari local?

**Masalah:** File tidak bisa dibuka  
**Solusi:** 
- Pastikan file ada: `d:\WISUDA GEL 3\ABSENSI\public-dashboard.html`
- Klik 2x untuk open di browser
- Atau drag ke browser window

---

## 📱 RESPONSIVE BREAKPOINTS

| Device | Width | Layout | Columns |
|--------|-------|--------|---------|
| Desktop | 1920px+ | Side-by-side | 3 |
| Laptop | 1200px | Side-by-side | 3 |
| Tablet | 768px | Stacked | 1-2 |
| Mobile | 375px | Stacked | 1 |

---

## 🎨 COLOR SCHEME

| Kategori | Warna | Hex | Icon |
|----------|-------|-----|------|
| Belum Scan | Red | #dc3545 | ✗ |
| Izin Keluar | Yellow | #ffc107 | 🚪 |
| Masuk Kembali | Blue | #17a2b8 | ← |

---

## ⚡ PERFORMANCE

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

### File Size
- **Total:** ~15KB (HTML + CSS + JS inline)
- **Load Time:** < 1 second
- **Memory:** Minimal (localStorage only)

### Auto-Refresh Impact
- 5-second interval = low CPU usage
- No external API calls
- Efficient DOM updates

---

## 📞 SUPPORT

### Tidak ada data?
Check:
1. Admin dashboard sudah import data?
2. Data ada di localStorage?
3. Browser allow localStorage?

### Data tidak update?
Check:
1. Browser developer console (F12)
2. Network tab - ada error?
3. Try refresh (F5)

### Styling issue?
Check:
1. Browser zoom level (Ctrl+0 to reset)
2. Clear cache (Ctrl+Shift+Del)
3. Try different browser

---

## 🎯 BEST PRACTICES

✅ **DO:**
- Deploy ke production (Vercel)
- Gunakan di room monitoring (fullscreen)
- Share URL ke panitia
- Update data via admin dashboard

❌ **DON'T:**
- Tidak usah login (sudah public!)
- Jangan coba edit data (read-only)
- Jangan hapus browser localStorage
- Jangan ganti file nama

---

## 📈 DEPLOYMENT CHECKLIST

- [ ] File tersimpan: `public-dashboard.html`
- [ ] Tested di local browser
- [ ] Responsive di mobile
- [ ] Data loads dari localStorage
- [ ] Auto-refresh works (5 second)
- [ ] Colors correct
- [ ] All 3 containers visible
- [ ] Push ke GitHub
- [ ] Vercel auto-deploy
- [ ] Access via production URL
- [ ] Share link ke panitia

---

## 🎉 SELESAI!

**Public Dashboard siap digunakan!**

### Next Steps:
1. ✅ Deploy public-dashboard.html
2. ✅ Share URL ke panitia/peserta
3. ✅ Display di layar monitoring
4. ✅ Monitor real-time stats

---

**Version:** 1.0  
**Status:** ✅ Production Ready  
**Last Updated:** September 17, 2026

