# 🔌 API INTEGRATION GUIDE - Frontend ↔ Backend

**Complete Architecture for Cloud Sync via Google Apps Script**

---

## 📋 ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────┐
│         FRONTEND (Vercel / HTML5)                       │
│  ├─ index.html (Admin Dashboard)                       │
│  ├─ public-dashboard.html (Public Monitor)             │
│  ├─ Scanner Interface (html5-qrcode)                   │
│  ├─ 3-Button Modal (Status Selection)                  │
│  └─ Data Management UI                                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP POST/GET
                     │ JSON Payload
                     │
┌────────────────────┴────────────────────────────────────┐
│      BACKEND (Google Apps Script)                       │
│  ├─ doPost(e) - API REST Endpoint                       │
│  ├─ getAllParticipants() - Fetch peserta                │
│  ├─ markAttendance(nim, status) - Record attendance     │
│  ├─ generateQRCode(nim, name) - QR generator            │
│  ├─ getAttendanceStats() - Statistics                   │
│  ├─ importParticipants(data) - Bulk import              │
│  └─ updateEventStatus(status) - Config update           │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Google Sheets API
                     │ Read/Write
                     │
┌────────────────────┴────────────────────────────────────┐
│      DATABASE (Google Spreadsheet)                      │
│  ├─ MASTERDATA (nim, nama, status, keterangan)         │
│  ├─ EVENT_CONFIG (event info, settings)                │
│  └─ ATTENDANCE_LOG (log history, timestamps)           │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 DATA FLOW

### 1️⃣ SCAN QR → RECORD ATTENDANCE

```
Frontend (index.html / public-dashboard.html)
    ↓
User Scan QR Code
    ↓
Extract NIM from QR
    ↓
Show 3-Button Modal (Hadir/Izin/Masuk)
    ↓
User Click Button
    ↓
Frontend Call API: markAttendance()
    │
    ├─ POST Request
    ├─ URL: GAS_URL
    ├─ Data: { action: "markAttendance", nim, status, timestamp }
    │
    ↓
Backend (Code.gs - doPost)
    ↓
Validate NIM exists
    ↓
Update MASTERDATA sheet
    ├─ Find row by NIM
    ├─ Update: status, keterangan, waktuScan
    │
Add to ATTENDANCE_LOG sheet
    ├─ New row: nim, nama, status, timestamp
    │
Return Response
    ├─ { success: true, message: "Presensi tercatat" }
    │
    ↓
Frontend Handle Response
    ↓
Show Success Toast
    ↓
Trigger UI Update (re-render tables)
    ↓
Auto-refresh data
```

### 2️⃣ IMPORT DATA PESERTA

```
Frontend (index.html - Tab: Input Data)
    ↓
Admin Upload Excel File
    ↓
Parse Excel (SheetJS)
    ↓
Prepare Participant Array
    ├─ { no, nim, nama, fakultas, prodi }
    │
Frontend Call API: importParticipants()
    │
    ├─ POST Request
    ├─ URL: GAS_URL
    ├─ Data: { action: "importParticipants", data: [...] }
    │
    ↓
Backend (Code.gs - doPost)
    ↓
Clear existing MASTERDATA
    ↓
Insert new data rows
    ├─ Headers: no, nim, nama, fakultas, prodi, status, keterangan, waktuScan
    ├─ Data: 1, 2190101093, Ahmad, Syari'ah, Hukum, null, null, null
    │
Return Response
    ├─ { success: true, count: 150, message: "150 peserta diimport" }
    │
    ↓
Frontend Update UI
    ├─ Show success message
    ├─ Display imported count
```

### 3️⃣ GET ALL PARTICIPANTS

```
Frontend (index.html - Page Load)
    ↓
Trigger: loadData() / refreshData()
    ↓
Frontend Call API: getAllParticipants()
    │
    ├─ POST Request
    ├─ URL: GAS_URL
    ├─ Data: { action: "getAllParticipants" }
    │
    ↓
Backend (Code.gs - doPost)
    ↓
Read MASTERDATA sheet
    ↓
Extract all rows (skip header)
    ↓
Build JSON array
    ├─ [
    │   { no: 1, nim: "2190101093", nama: "Ahmad", status: "HADIR", keterangan: "Di Lokasi", waktuScan: "17/09/2026 10:30" },
    │   { no: 2, nim: "2190202114", nama: "Rahma", status: null, keterangan: null, waktuScan: null },
    │   ...
    │ ]
    │
Return JSON Response
    ├─ { success: true, data: [...], count: 150 }
    │
    ↓
Frontend Update LocalStorage (optional cache)
    ├─ Save for offline fallback
    │
Frontend Render UI
    ├─ Update dashboard stats
    ├─ Populate tables
    ├─ Display live data
```

### 4️⃣ GET STATISTICS

```
Frontend (Dashboard tab)
    ↓
On page load / Every 5 seconds
    ↓
Frontend Call API: getAttendanceStats()
    │
    ├─ POST Request
    ├─ URL: GAS_URL
    ├─ Data: { action: "getAttendanceStats" }
    │
    ↓
Backend (Code.gs - doPost)
    ↓
Read MASTERDATA sheet
    ↓
Calculate Stats
    ├─ Total peserta = count all rows
    ├─ Hadir = count where status != null
    ├─ Izin keluar = count where keterangan == "Keluar"
    ├─ Masuk kembali = count where keterangan == "Masuk Kembali"
    ├─ Belum = count where status == null
    │
Return JSON Response
    ├─ {
    │   success: true,
    │   stats: {
    │     total: 150,
    │     hadir: 120,
    │     izinKeluar: 15,
    │     masukKembali: 8,
    │     belum: 12
    │   }
    │ }
    │
    ↓
Frontend Update Stats Cards
    ├─ stat-total.innerText = 150
    ├─ stat-hadir.innerText = 120
    ├─ ... etc
```

---

## 🔌 API ENDPOINTS

### GAS Configuration

**URL Template:**
```
https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

**Current (index.html Line 491):**
```javascript
const GAS_URL = "https://script.google.com/macros/s/AKfycbxj_xwSWorfh8O9IGnF8dMusia3sWRFIU8lTJkBiFnCyJLInafLJfevZDLkhMDND3dIpw/exec";
```

---

## 📡 API METHODS (Backend: Code.gs)

### 1. getAllParticipants()

**Request:**
```javascript
POST {GAS_URL}
{
  "action": "getAllParticipants"
}
```

**Response:**
```javascript
{
  "success": true,
  "data": [
    {
      "no": 1,
      "nim": "2190101093",
      "nama": "Ahmad Mujiburrahman",
      "fakultas": "Syari'ah",
      "prodi": "Hukum Keluarga",
      "status": "HADIR",
      "keterangan": "Di Lokasi",
      "waktuScan": "17/09/2026, 10:30:45"
    },
    ...
  ],
  "count": 150
}
```

---

### 2. markAttendance()

**Request:**
```javascript
POST {GAS_URL}
{
  "action": "markAttendance",
  "nim": "2190101093",
  "status": "HADIR",
  "keterangan": "Di Lokasi" | "Keluar" | "Masuk Kembali",
  "timestamp": "2026-09-17T10:30:45Z"
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "Presensi Ahmad Mujiburrahman tercatat",
  "data": {
    "nim": "2190101093",
    "nama": "Ahmad Mujiburrahman",
    "status": "HADIR",
    "keterangan": "Di Lokasi",
    "waktuScan": "17/09/2026, 10:30:45"
  }
}
```

---

### 3. generateQRCode()

**Request:**
```javascript
POST {GAS_URL}
{
  "action": "generateQRCode",
  "nim": "2190101093",
  "nama": "Ahmad Mujiburrahman"
}
```

**Response:**
```javascript
{
  "success": true,
  "qrUrl": "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=2190101093%7CAhmad%20Mujiburrahman"
}
```

---

### 4. getAttendanceStats()

**Request:**
```javascript
POST {GAS_URL}
{
  "action": "getAttendanceStats"
}
```

**Response:**
```javascript
{
  "success": true,
  "stats": {
    "total": 150,
    "hadir": 120,
    "izinKeluar": 15,
    "masukKembali": 8,
    "belum": 12
  }
}
```

---

### 5. importParticipants()

**Request:**
```javascript
POST {GAS_URL}
{
  "action": "importParticipants",
  "data": [
    { "no": 1, "nim": "2190101093", "nama": "Ahmad", "fakultas": "Syari'ah", "prodi": "Hukum" },
    { "no": 2, "nim": "2190202114", "nama": "Rahma", "fakultas": "Tarbiyah", "prodi": "Bahasa Arab" },
    ...
  ]
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "150 peserta berhasil diimport",
  "count": 150
}
```

---

### 6. updateEventStatus()

**Request:**
```javascript
POST {GAS_URL}
{
  "action": "updateEventStatus",
  "status": "AKTIF" | "SELESAI" | "PAUSED"
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "Status event diubah ke AKTIF",
  "status": "AKTIF"
}
```

---

## 🔧 IMPLEMENTATION IN FRONTEND

### Frontend API Call Pattern

**Generic function:**
```javascript
async function callAPI(action, payload = {}) {
  const data = {
    action: action,
    ...payload
  };
  
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      payload: JSON.stringify(data)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
}
```

**Usage examples:**

```javascript
// Get all participants
async function loadParticipants() {
  const result = await callAPI('getAllParticipants');
  if (result.success) {
    participants = result.data;
    updateDisplay();
  }
}

// Mark attendance
async function recordAttendance(nim, status) {
  const result = await callAPI('markAttendance', {
    nim: nim,
    status: 'HADIR',
    keterangan: status,
    timestamp: new Date().toISOString()
  });
  
  if (result.success) {
    showToast('Presensi tercatat');
    loadParticipants(); // Refresh
  }
}

// Get stats
async function updateStats() {
  const result = await callAPI('getAttendanceStats');
  if (result.success) {
    document.getElementById('stat-total').innerText = result.stats.total;
    document.getElementById('stat-hadir').innerText = result.stats.hadir;
    // ... etc
  }
}
```

---

## 🔄 DATA SYNC STRATEGY

### Option 1: Real-Time Cloud Sync (Recommended)
```
Frontend Action
    ↓
Immediate API Call to Backend
    ↓
Update Google Sheets
    ↓
Return confirmation
    ↓
Update Frontend UI
```

**Pros:**
- Always in sync
- No data conflict
- Real-time across users
- Single source of truth

**Cons:**
- Need internet
- Slower (API latency ~1-2 sec)

### Option 2: Hybrid (Offline + Sync)
```
Frontend Action
    ↓
Update LocalStorage (immediate)
    ↓
Update UI (instant feedback)
    ↓
Try API Call (background)
    ↓
On success: Keep changes
On fail: Revert from cache
```

**Pros:**
- Offline capability
- Fast UX
- Fallback option

**Cons:**
- More complex
- Potential conflicts

**Recommendation:** Use Option 1 for production (simpler, safer)

---

## ⚙️ ERROR HANDLING

### Network Error
```javascript
if (!response.ok) {
  throw new Error('Network error: ' + response.status);
}
```

### API Error Response
```javascript
{
  "success": false,
  "error": "NIM not found",
  "code": "NOT_FOUND"
}
```

### Timeout
```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);
```

---

## 🔐 SECURITY

### Authentication
- Simple password login (1122)
- Session management (browser localStorage)

### Data Validation
- NIM format validation
- Status validation (enum: HADIR, IZIN_KELUAR, MASUK_KEMBALI)
- No SQL injection (Google Sheets, not SQL)

### CORS
- Vercel frontend can call GAS URL
- GAS allows public POST requests
- CORS not an issue for GAS

---

## 📊 PERFORMANCE

### Latency
- GAS API call: ~0.5-2 seconds
- Google Sheets write: ~0.3-1 second
- Total round trip: ~1-3 seconds

### Optimization
- Batch operations when possible
- Cache frequently accessed data
- Async operations (don't block UI)
- Loading indicators for users

### Limits
- GAS: 20 requests/minute
- Sheets API: 60 requests/minute
- Sufficient for single event

---

## 🧪 TESTING API

### cURL Command (test from terminal)
```bash
curl -X POST "https://script.google.com/macros/s/[ID]/exec" \
  -H "Content-Type: application/json" \
  -d '{"action":"getAllParticipants"}'
```

### Browser DevTools
```javascript
// Console tab
fetch('GAS_URL', {
  method: 'POST',
  payload: JSON.stringify({action: 'getAllParticipants'})
}).then(r => r.json()).then(console.log)
```

### Frontend Test Page
- See: TEST_API.html

---

## 📋 MIGRATION CHECKLIST

From LocalStorage to GAS API:

- [ ] Update `index.html` - Add API calls
- [ ] Update `public-dashboard.html` - Add API calls
- [ ] Verify `Code.gs` - All endpoints working
- [ ] Test `getAllParticipants()` - Fetch working
- [ ] Test `markAttendance()` - Recording working
- [ ] Test `importParticipants()` - Bulk import working
- [ ] Test `getAttendanceStats()` - Stats working
- [ ] Add error handling - UI feedback
- [ ] Add loading indicators - UX feedback
- [ ] Test offline fallback (if hybrid mode)
- [ ] Deploy to Vercel - Test production
- [ ] Monitor logs - Check errors
- [ ] Train users - Explain new system

---

## 🚀 BENEFITS OF API INTEGRATION

✅ **Single Source of Truth** - Google Sheets as database  
✅ **Multi-User Support** - Real-time sync across devices  
✅ **Data Persistence** - Cloud backup (Google Sheets)  
✅ **Scalability** - Can handle many concurrent users  
✅ **Audit Trail** - ATTENDANCE_LOG sheet records all activity  
✅ **No Backend Server** - Serverless (GAS handles it)  
✅ **Easy Maintenance** - Update Code.gs, instant deploy  
✅ **Production Ready** - Same as big systems use

---

**Version:** 1.0  
**Status:** ✅ Architecture Complete  
**Implementation:** Ready for Frontend Update

