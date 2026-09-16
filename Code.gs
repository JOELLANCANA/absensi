// =================================================================================
// SISTEM PRESENSI QR CODE UIN AR-RANIRY BANDA ACEH
// File: Code.gs (Backend Google Apps Script)
// FITUR: Auto Sheet Setup, Web App Serving, google.script.run & REST API Handler
// =================================================================================

// Konfigurasi Spreadsheet & Sheet MASTERDATA
var SPREADSHEET_ID = "11q7bt212H_-l-CcklK-yygeigMQH8l-CBGihT1BGKHk";
var SHEET_NAME = "MASTERDATA";

/**
 * Otomatis mendapatkan spreadsheet berdasarkan ID Spreadsheet & Nama Sheet MASTERDATA
 */
function getTargetSheet() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (err) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    initSheetHeaders(sheet);
  }
  return sheet;
}

/**
 * Inisialisasi Header Kolom jika Sheet DATAMASTER masih kosong
 */
function initSheetHeaders(sheet) {
  var headers = [
    ["NIM / ID", "Nama Lengkap", "Fakultas", "Program Studi (Prodi)", "Instansi / Kontak", "URL QR Code", "Status Kehadiran", "Status Keluar-Masuk", "Waktu Presensi Terakhir"]
  ];
  sheet.getRange(1, 1, 1, 9).setValues(headers);
  sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#006338").setFontColor("#FFFFFF");
  sheet.setFrozenRows(1);
  
  // Sample Initial Data UIN Ar-Raniry dengan Prodi
  var sampleData = [
    ["210801001", "Ahmad Mujiburrahman", "FST", "Teknik Informatika", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
    ["210801002", "Cut Sarah Maulida", "FTK", "Pendidikan Bahasa Inggris", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
    ["210801003", "Muhammad Farhan", "FEBI", "Perbankan Syariah", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
    ["210801004", "Nadia Ulfa", "FSH", "Hukum Ekonomi Syariah", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"],
    ["210801005", "Rahmat Hidayatullah", "FAH", "Sejarah Kebudayaan Islam", "UIN Ar-Raniry", "", "BELUM HADIR", "-", "-"]
  ];
  sheet.getRange(2, 1, sampleData.length, 9).setValues(sampleData);
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

    if (action === "getParticipantData") {
      response = getParticipantData();
    } else if (action === "markAttendance") {
      response = markAttendance(contents.id, contents.scanMode);
    } else if (action === "addParticipant") {
      response = addParticipant(contents.id, contents.nama, contents.fakultas);
    }

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Mengambil seluruh data peserta dari Google Sheet (Sheet: DATAMASTER)
 */
function getParticipantData() {
  try {
    var sheet = getTargetSheet();
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
 * Mencatat/Update Presensi Kehadiran & Status Keluar-Masuk Peserta
 */
function markAttendance(participantId, targetScanMode) {
  try {
    var sheet = getTargetSheet();
    var data = sheet.getDataRange().getValues();
    var now = new Date();
    var timeString = Utilities.formatDate(now, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    
    var cleanSearchId = String(participantId).trim().toUpperCase();
    var nextKM = targetScanMode || "HADIR";

    for (var i = 1; i < data.length; i++) {
      var rowId = String(data[i][0]).trim().toUpperCase();
      
      if (rowId === cleanSearchId) {
        // Kolom 7 (Status), Kolom 8 (Status KM), Kolom 9 (Waktu)
        sheet.getRange(i + 1, 7).setValue("HADIR");
        sheet.getRange(i + 1, 8).setValue(nextKM);
        sheet.getRange(i + 1, 9).setValue(timeString);

        return {
          success: true,
          message: "Presensi (" + nextKM + ") berhasil dicatat!",
          data: {
            id: String(data[i][0]),
            nama: String(data[i][1]),
            fakultas: String(data[i][2]),
            prodi: String(data[i][3] || "-"),
            instansi: String(data[i][4] || "UIN Ar-Raniry"),
            status: "HADIR",
            statusKeluarMasuk: nextKM,
            waktuHadir: timeString
          }
        };
      }
    }

    return { success: false, message: "NIM / ID (" + participantId + ") tidak ditemukan di spreadsheet!" };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

/**
 * Menambahkan Peserta Baru ke Google Spreadsheet (DATAMASTER)
 */
function addParticipant(id, nama, fakultas, prodi, instansi) {
  try {
    var sheet = getTargetSheet();
    var data = sheet.getDataRange().getValues();
    var cleanId = String(id).trim();

    // Cek Duplikasi NIM / ID
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim().toUpperCase() === cleanId.toUpperCase()) {
        return { success: false, message: "NIM / ID ini sudah terdaftar sebelumnya!" };
      }
    }

    sheet.appendRow([cleanId, nama.trim(), fakultas.trim(), (prodi || "Umum").trim(), (instansi || "UIN Ar-Raniry").trim(), "", "BELUM HADIR", "-", "-"]);
    
    return {
      success: true,
      message: "Peserta berhasil ditambahkan!",
      data: { id: cleanId, nama: nama, fakultas: fakultas, prodi: prodi, instansi: instansi, status: "BELUM HADIR", statusKeluarMasuk: "-", waktuHadir: "-" }
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

/**
 * Format Waktu WIB
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

/**
 * Memastikan tabel awal tersedia
 */
function setupDatabaseIfEmpty() {
  var sheet = getTargetSheet();
  if (sheet.getLastRow() === 0) {
    initSheetHeaders(sheet);
  }
}