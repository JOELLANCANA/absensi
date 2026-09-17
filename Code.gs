// =================================================================================
// SISTEM PRESENSI QR CODE UIN AR-RANIRY BANDA ACEH
// File: Code.gs (Backend Google Apps Script)
// FITUR: QR Generation, Attendance Tracking, Real-time Sync, Event Management
// =================================================================================

// Konfigurasi Spreadsheet & Sheets
var SPREADSHEET_ID = "11q7bt212H_-l-CcklK-yygeigMQH8l-CBGihT1BGKHk";
var SHEET_MASTERDATA = "MASTERDATA";
var SHEET_EVENT_CONFIG = "EVENT_CONFIG";
var SHEET_ATTENDANCE_LOG = "ATTENDANCE_LOG";

// Konfigurasi Event Default
var DEFAULT_EVENT = {
  title: "Wisuda & Orasi Ilmiah UIN Ar-Raniry",
  date: "Senin, 20 Oktober 2026",
  time: "08.00 - 12.00 WIB",
  location: "Gedung Auditorium Ali Hasjmy",
  status: "AKTIF",
  password: "admin123"
};

/**
 * Mendapatkan Spreadsheet
 */
function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (err) {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
}

/**
 * Mendapatkan atau membuat Sheet berdasarkan nama
 */
function getOrCreateSheet(sheetName) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

/**
 * Inisialisasi Sheet MASTERDATA
 */
function initMasterdataSheet() {
  var sheet = getOrCreateSheet(SHEET_MASTERDATA);
  if (sheet.getLastRow() === 0) {
    var headers = [
      ["NIM / ID", "Nama Lengkap", "Fakultas", "Program Studi", "Instansi", "URL QR Code", "Status", "Status Keluar-Masuk", "Waktu Presensi"]
    ];
    sheet.getRange(1, 1, 1, 9).setValues(headers);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#006338").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    
    var sampleData = [
      ["210801001", "Ahmad Mujiburrahman", "FST", "Teknik Informatika", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
      ["210801002", "Cut Sarah Maulida", "FTK", "Pendidikan Bahasa Inggris", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
      ["210801003", "Muhammad Farhan", "FEBI", "Perbankan Syariah", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
      ["210801004", "Nadia Ulfa", "FSH", "Hukum Ekonomi Syariah", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
      ["210801005", "Rahmat Hidayatullah", "FAH", "Sejarah Kebudayaan Islam", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"]
    ];
    sheet.getRange(2, 1, sampleData.length, 9).setValues(sampleData);
  }
}

/**
 * Inisialisasi Sheet EVENT_CONFIG
 */
function initEventConfigSheet() {
  var sheet = getOrCreateSheet(SHEET_EVENT_CONFIG);
  if (sheet.getLastRow() === 0) {
    var headers = [["Field", "Value"]];
    sheet.getRange(1, 1, 1, 2).setValues(headers);
    sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#006338").setFontColor("#FFFFFF");
    
    var eventData = [
      ["Title", DEFAULT_EVENT.title],
      ["Date", DEFAULT_EVENT.date],
      ["Time", DEFAULT_EVENT.time],
      ["Location", DEFAULT_EVENT.location],
      ["Status", DEFAULT_EVENT.status],
      ["AdminPassword", DEFAULT_EVENT.password]
    ];
    sheet.getRange(2, 1, eventData.length, 2).setValues(eventData);
  }
}

/**
 * Inisialisasi Sheet ATTENDANCE_LOG
 */
function initAttendanceLogSheet() {
  var sheet = getOrCreateSheet(SHEET_ATTENDANCE_LOG);
  if (sheet.getLastRow() === 0) {
    var headers = [
      ["Timestamp", "NIM", "Nama", "Status Scan", "Aksi Panitia", "Catatan"]
    ];
    sheet.getRange(1, 1, 1, 6).setValues(headers);
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#006338").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
}

/**
 * Setup Database awal
 */
function setupDatabaseIfEmpty() {
  initMasterdataSheet();
  initEventConfigSheet();
  initAttendanceLogSheet();
}

/**
 * Melayani antarmuka HTML Web App
 */
function doGet(e) {
  setupDatabaseIfEmpty();
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('SI-ABSENSI QR | UIN Ar-Raniry Banda Aceh')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * API REST Endpoint (Mendukung permintaan External Post/Fetch)
 */
function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var response = { success: false, message: "Aksi tidak valid" };

    switch (action) {
      case "getAllParticipants":
        response = getAllParticipants();
        break;
      case "getEventConfig":
        response = getEventConfig();
        break;
      case "markAttendance":
        response = markAttendance(contents.id, contents.scanMode);
        break;
      case "addParticipant":
        response = addParticipant(contents.id, contents.nama, contents.fakultas, contents.prodi, contents.instansi);
        break;
      case "generateQRCode":
        response = generateQRCode(contents.id, contents.nama);
        break;
      case "getAttendanceStats":
        response = getAttendanceStats();
        break;
      case "updateEventStatus":
        response = updateEventStatus(contents.newStatus, contents.password);
        break;
      case "updateEventConfig":
        response = updateEventConfig(contents.title, contents.date, contents.time, contents.location, contents.password);
        break;
      case "exportAttendanceReport":
        response = exportAttendanceReport();
        break;
    }

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Mengambil SEMUA data peserta dari MASTERDATA Sheet
 */
function getAllParticipants() {
  try {
    var sheet = getOrCreateSheet(SHEET_MASTERDATA);
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { success: true, data: [] };
    }
    
    var result = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0]) {
        result.push({
          row: i + 1,
          id: String(data[i][0]).trim(),
          nama: String(data[i][1]).trim(),
          fakultas: String(data[i][2]).trim(),
          prodi: String(data[i][3] || "-").trim(),
          instansi: String(data[i][4] || "UIN Ar-Raniry").trim(),
          qrCodeUrl: String(data[i][5] || ""),
          status: String(data[i][6] || "BELUM HADIR").trim(),
          statusKeluarMasuk: String(data[i][7] || "-").trim(),
          waktuHadir: data[i][8] ? formatDateValue(data[i][8]) : "-"
        });
      }
    }
    return { success: true, data: result };
  } catch (e) {
    return { success: false, message: e.toString(), data: [] };
  }
}

/**
 * Mengambil Konfigurasi Event
 */
function getEventConfig() {
  try {
    var sheet = getOrCreateSheet(SHEET_EVENT_CONFIG);
    var data = sheet.getDataRange().getValues();
    
    var config = {
      title: DEFAULT_EVENT.title,
      date: DEFAULT_EVENT.date,
      time: DEFAULT_EVENT.time,
      location: DEFAULT_EVENT.location,
      status: DEFAULT_EVENT.status
    };
    
    for (var i = 1; i < data.length; i++) {
      var field = String(data[i][0]).trim();
      var value = String(data[i][1]).trim();
      
      if (field === "Title") config.title = value;
      if (field === "Date") config.date = value;
      if (field === "Time") config.time = value;
      if (field === "Location") config.location = value;
      if (field === "Status") config.status = value;
    }
    
    return { success: true, data: config };
  } catch (e) {
    return { success: false, message: e.toString(), data: null };
  }
}

/**
 * Mencatat Presensi & Update Status Peserta
 */
function markAttendance(participantId, scanMode) {
  try {
    var sheet = getOrCreateSheet(SHEET_MASTERDATA);
    var logSheet = getOrCreateSheet(SHEET_ATTENDANCE_LOG);
    var data = sheet.getDataRange().getValues();
    var now = new Date();
    var timeString = Utilities.formatDate(now, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    
    var cleanId = String(participantId).trim().toUpperCase();
    var actionMode = scanMode || "HADIR";

    for (var i = 1; i < data.length; i++) {
      var rowId = String(data[i][0]).trim().toUpperCase();
      
      if (rowId === cleanId) {
        var participantName = String(data[i][1]).trim();
        
        // Update Status Kehadiran
        sheet.getRange(i + 1, 7).setValue("HADIR");
        
        // Update Status Keluar-Masuk berdasarkan scanMode
        var finalStatus = actionMode;
        if (actionMode === "HADIR" || actionMode === "MASUK KEMBALI") {
          finalStatus = "DI LOKASI";
        } else if (actionMode === "IZIN KELUAR") {
          finalStatus = "KELUAR";
        }
        
        sheet.getRange(i + 1, 8).setValue(finalStatus);
        sheet.getRange(i + 1, 9).setValue(timeString);
        
        // Log ke ATTENDANCE_LOG
        logSheet.appendRow([timeString, String(data[i][0]), participantName, "SUCCESS", actionMode, "Scan QR berhasil"]);

        return {
          success: true,
          message: "✅ Presensi (" + actionMode + ") berhasil dicatat untuk " + participantName,
          data: {
            id: String(data[i][0]),
            nama: participantName,
            fakultas: String(data[i][2]).trim(),
            prodi: String(data[i][3] || "-").trim(),
            instansi: String(data[i][4] || "UIN Ar-Raniry").trim(),
            status: "HADIR",
            statusKeluarMasuk: finalStatus,
            waktuHadir: timeString
          }
        };
      }
    }

    // Catat gagal ke log
    logSheet.appendRow([timeString, participantId, "Unknown", "FAILED", scanMode || "HADIR", "NIM tidak ditemukan"]);

    return { 
      success: false, 
      message: "❌ NIM / ID (" + participantId + ") tidak ditemukan di spreadsheet!" 
    };
  } catch (err) {
    return { success: false, message: "⚠️ Error: " + err.toString() };
  }
}

/**
 * Menambah Peserta Baru
 */
function addParticipant(id, nama, fakultas, prodi, instansi) {
  try {
    var sheet = getOrCreateSheet(SHEET_MASTERDATA);
    var data = sheet.getDataRange().getValues();
    var cleanId = String(id).trim();

    // Cek Duplikasi
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim().toUpperCase() === cleanId.toUpperCase()) {
        return { success: false, message: "❌ NIM / ID ini sudah terdaftar sebelumnya!" };
      }
    }

    sheet.appendRow([
      cleanId, 
      nama.trim(), 
      fakultas.trim(), 
      (prodi || "Umum").trim(), 
      (instansi || "UIN Ar-Raniry").trim(), 
      "", 
      "BELUM HADIR", 
      "-", 
      "-"
    ]);
    
    return {
      success: true,
      message: "✅ Peserta berhasil ditambahkan!",
      data: { 
        id: cleanId, 
        nama: nama, 
        fakultas: fakultas, 
        prodi: prodi, 
        instansi: instansi, 
        status: "BELUM HADIR" 
      }
    };
  } catch (err) {
    return { success: false, message: "⚠️ Error: " + err.toString() };
  }
}

/**
 * Generate QR Code URL (menggunakan layanan QR gratis)
 */
function generateQRCode(participantId, participantName) {
  try {
    // Encoded data untuk QR: {id}|{nama}
    var qrData = encodeURIComponent(participantId + "|" + participantName);
    
    // Gunakan API QR Code gratis (goqr.me)
    var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + qrData;
    
    // Update QR URL di spreadsheet
    var sheet = getOrCreateSheet(SHEET_MASTERDATA);
    var data = sheet.getDataRange().getValues();
    
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === participantId) {
        sheet.getRange(i + 1, 6).setValue(qrUrl);
        break;
      }
    }
    
    return {
      success: true,
      message: "✅ QR Code berhasil di-generate",
      qrUrl: qrUrl
    };
  } catch (err) {
    return { success: false, message: "⚠️ Error generating QR: " + err.toString() };
  }
}

/**
 * Dapatkan Statistik Kehadiran
 */
function getAttendanceStats() {
  try {
    var sheet = getOrCreateSheet(SHEET_MASTERDATA);
    var data = sheet.getDataRange().getValues();
    
    var stats = {
      total: 0,
      hadir: 0,
      keluar: 0,
      belum: 0,
      masukKembali: 0
    };

    for (var i = 1; i < data.length; i++) {
      if (data[i][0]) {
        stats.total++;
        var status = String(data[i][6] || "BELUM HADIR").trim().toUpperCase();
        var statusKM = String(data[i][7] || "-").trim().toUpperCase();
        
        if (status === "HADIR") {
          if (statusKM === "KELUAR") {
            stats.keluar++;
          } else if (statusKM === "MASUK KEMBALI") {
            stats.masukKembali++;
          } else {
            stats.hadir++;
          }
        } else {
          stats.belum++;
        }
      }
    }

    return { success: true, data: stats };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

/**
 * Update Status Event (Aktif/Arsip)
 */
function updateEventStatus(newStatus, password) {
  try {
    if (password !== DEFAULT_EVENT.password) {
      return { success: false, message: "❌ Password admin salah!" };
    }

    var sheet = getOrCreateSheet(SHEET_EVENT_CONFIG);
    var data = sheet.getDataRange().getValues();
    
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === "Status") {
        sheet.getRange(i + 1, 2).setValue(newStatus);
        return { 
          success: true, 
          message: "✅ Status event diperbarui: " + newStatus
        };
      }
    }
  } catch (err) {
    return { success: false, message: "⚠️ Error: " + err.toString() };
  }
}

/**
 * Update Konfigurasi Event
 */
function updateEventConfig(title, date, time, location, password) {
  try {
    if (password !== DEFAULT_EVENT.password) {
      return { success: false, message: "❌ Password admin salah!" };
    }

    var sheet = getOrCreateSheet(SHEET_EVENT_CONFIG);
    var data = sheet.getDataRange().getValues();
    
    var updates = {
      "Title": title,
      "Date": date,
      "Time": time,
      "Location": location
    };
    
    for (var i = 1; i < data.length; i++) {
      var field = String(data[i][0]).trim();
      if (updates[field]) {
        sheet.getRange(i + 1, 2).setValue(updates[field]);
      }
    }
    
    return { success: true, message: "✅ Konfigurasi event berhasil diperbarui!" };
  } catch (err) {
    return { success: false, message: "⚠️ Error: " + err.toString() };
  }
}

/**
 * Export Laporan Kehadiran
 */
function exportAttendanceReport() {
  try {
    var sheet = getOrCreateSheet(SHEET_MASTERDATA);
    var data = sheet.getDataRange().getValues();
    
    var report = {
      timestamp: Utilities.formatDate(new Date(), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss"),
      participants: []
    };
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][0]) {
        report.participants.push({
          id: String(data[i][0]).trim(),
          nama: String(data[i][1]).trim(),
          fakultas: String(data[i][2]).trim(),
          prodi: String(data[i][3] || "-").trim(),
          status: String(data[i][6] || "BELUM HADIR").trim(),
          statusKeluarMasuk: String(data[i][7] || "-").trim(),
          waktuPresensi: data[i][8] ? formatDateValue(data[i][8]) : "-"
        });
      }
    }
    
    return { success: true, data: report };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

/**
 * Format Waktu ke Format Lokal WIB
 */
function formatDateValue(dateVal) {
  if (!dateVal) return "-";
  if (typeof dateVal === 'string') return dateVal;
  try {
    return Utilities.formatDate(new Date(dateVal), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
  } catch (e) {
    return String(dateVal);
  }
}