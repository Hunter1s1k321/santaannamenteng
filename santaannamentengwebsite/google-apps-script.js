// ========================================
// GOOGLE APPS SCRIPT - ABSENSI PD ST ANNA MENTENG
// ========================================
// Integrasi HTML Form + Google Form + WhatsApp Notification
// Copy script ini ke Google Apps Script Editor (ganti kode yang lama)

//---------------------------------------------------------
// KONFIGURASI GLOBAL
//---------------------------------------------------------
const CONFIG = {
  SPREADSHEET_ID: '1U6p_iVVOLDdyeHqDBrT3mbMInaASKa5EL2UrfXHw4FQ',
  SHEET_NAME: 'Form responses 1',  // ✅ Sheet tempat Google Form menyimpan data
  TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ2OXpNdDlSaHFWVnhFclUyb0RLVXNsR3Byd3Q1Qks1RyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1MTI4OTQ5fQ.X2eHa5OrzRsR2mr0NdY_BEyqm_72Nsy4iPBZGQtfZss",
  INSTANCE_ID: "eyJ1aWQiOiJ2OXpNdDlSaHFWVnhFclUyb0RLVXNsR3Byd3Q1Qks1RyIsImNsaWVudF9pZCI6IlBEIFN0LkFubmEgTWVudGVuZyJ9",
  ADMIN_TARGETS: ["08111928287"],
  BASE_URL: "https://crm.chatera.id/api/v1/send-text"
};

//---------------------------------------------------------
// FUNGSI UNTUK QUERY DATA (GET REQUEST)
//---------------------------------------------------------
function doGet(e) {
  try {
    const params = e.parameter;
    
    // Check action type
    if (params.action === 'getQueueNumber') {
      return getQueueNumberByData(params);
    }
    
    if (params.action === 'getTotalRows') {
      return getTotalRows();
    }
    
    // Default response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Invalid action parameter'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error doGet: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Terjadi kesalahan: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

//---------------------------------------------------------
// FUNGSI UNTUK MENDAPATKAN TOTAL PENDAFTAR (UNTUK QUOTA)
//---------------------------------------------------------
function getTotalRows() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Sheet tidak ditemukan'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const totalRows = sheet.getLastRow() - 1; // Minus 1 untuk header
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        totalRows: totalRows,
        message: 'Total rows retrieved'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error getTotalRows: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Terjadi kesalahan: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

//---------------------------------------------------------
// FUNGSI UNTUK MENCARI NOMOR URUT BERDASARKAN DATA USER
//---------------------------------------------------------
function getQueueNumberByData(params) {
  try {
    const nomorHP = params.nomor_hp;
    const namaLengkap = params.nama_lengkap;
    
    if (!nomorHP) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Nomor HP diperlukan'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Buka spreadsheet
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Sheet tidak ditemukan'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ambil semua data
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Cari data user (mulai dari row 2, skip header)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowNomorHP = String(row[4] || '').trim(); // Kolom E: Nomor HP
      const rowNamaLengkap = String(row[2] || '').trim(); // Kolom C: Nama Lengkap
      
      // Normalisasi nomor HP untuk perbandingan
      const normalizedSearchHP = nomorHP.replace(/[\s\-\(\)]/g, '');
      const normalizedRowHP = rowNomorHP.replace(/[\s\-\(\)]/g, '');
      
      // Check jika nomor HP cocok
      if (normalizedRowHP.includes(normalizedSearchHP) || normalizedSearchHP.includes(normalizedRowHP)) {
        // Double check dengan nama jika ada
        if (namaLengkap) {
          const normalizedSearchName = namaLengkap.toLowerCase().trim();
          const normalizedRowName = rowNamaLengkap.toLowerCase().trim();
          
          if (!normalizedRowName.includes(normalizedSearchName) && !normalizedSearchName.includes(normalizedRowName)) {
            continue; // Nama tidak cocok, lanjut cari
          }
        }
        
        // Data ditemukan! Return nomor urut sesuai row spreadsheet
        const queueNumber = i + 1; // i=1 adalah values[1] = row 2 spreadsheet, jadi +1
        
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            queueNumber: queueNumber,
            message: 'Data ditemukan'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Data tidak ditemukan
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Data tidak ditemukan di spreadsheet',
        queueNumber: null
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error getQueueNumberByData: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Terjadi kesalahan: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

//---------------------------------------------------------
// FUNGSI UNTUK TERIMA DATA DARI HTML FORM
//---------------------------------------------------------
function doPost(e) {
  try {
    // Ambil data dari HTML form
    const data = e.parameter;
    
    // Validasi data wajib
    if (!data.nama_panggilan || !data.nama_lengkap || !data.nomor_hp || !data.asal_paroki) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Data tidak lengkap! Pastikan semua field wajib diisi.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Buka spreadsheet
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    
    // Cek apakah spreadsheet berhasil dibuka
    if (!spreadsheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Spreadsheet tidak ditemukan! ID: ' + CONFIG.SPREADSHEET_ID
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Dapatkan semua sheet untuk debugging
    const allSheets = spreadsheet.getSheets();
    const sheetNames = allSheets.map(s => s.getName()).join(', ');
    
    // Cari sheet
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    // Validasi sheet ditemukan
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Sheet tidak ditemukan! Yang dicari: "' + CONFIG.SHEET_NAME + '". Sheet yang ada: [' + sheetNames + ']'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Timestamp otomatis
    const timestamp = new Date();
    
    // Format tanggal lahir jika ada
    let formattedTanggalLahir = '';
    if (data.tanggal_lahir) {
      const parts = data.tanggal_lahir.split('-');
      if (parts.length === 3) {
        formattedTanggalLahir = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
      }
    }
    
    // Susun data sesuai urutan kolom di spreadsheet
    // PENTING: Urutan harus sesuai dengan header spreadsheet!
    const rowData = [
      timestamp,                        // Kolom A: Timestamp
      data.nama_panggilan || '',        // Kolom B: Nama panggilan
      data.nama_lengkap || '',          // Kolom C: Nama Lengkap
      formattedTanggalLahir,            // Kolom D: Tanggal Lahir (format DD/MM/YYYY atau kosong)
      data.nomor_hp || '',              // Kolom E: Nomor HP
      data.asal_paroki || '',           // Kolom F: Asal Paroki / Gereja
      ''                                // Kolom G: Column 1 (kosong untuk sekarang)
    ];
    
    // Tambahkan data ke sheet
    sheet.appendRow(rowData);
    
    // Log untuk debugging
    Logger.log('Data yang dikirim: ' + JSON.stringify(data));
    Logger.log('Row data: ' + JSON.stringify(rowData));
    
    // Ambil nomor urut (baris terakhir - 1 untuk header)
    const nomorUrut = sheet.getLastRow() - 1;
    
    // Kirim WhatsApp notification
    sendWhatsAppNotifications({
      nama_lengkap: data.nama_lengkap,
      nama_panggilan: data.nama_panggilan,
      tanggal_lahir: data.tanggal_lahir,
      nomor_hp: data.nomor_hp,
      asal_paroki: data.asal_paroki,
      nomor_urut: nomorUrut
    });
    
    // Response sukses
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data berhasil disimpan! Nomor urut Anda: ' + nomorUrut,
        nomor_urut: nomorUrut
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error doPost: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Terjadi kesalahan: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

//---------------------------------------------------------
// FUNGSI UNTUK GOOGLE FORM (YANG SUDAH ADA)
//---------------------------------------------------------
function onFormSubmit(e) {
  //---------------------------------------------------------
  // FUNGSI AMBIL DATA (AMAN)
  //---------------------------------------------------------
  function getValue(name) {
    if (!e.namedValues[name]) return "NULL";
    return e.namedValues[name][0] || "NULL";
  }

  //---------------------------------------------------------
  // AMBIL DATA DARI GOOGLE FORM
  //---------------------------------------------------------
  const name = getValue("Nama Lengkap");
  const var_1 = getValue("Nama panggilan");
  const var_2_raw = getValue("Tanggal Lahir ( Tidak Wajib Di isi )");
  const var_3 = getValue("Asal Paroki / Gereja");
  const whatsapp_number = convertToInternationalFormat(getValue("Nomor HP"));

  //---------------------------------------------------------
  // VALIDASI WA
  //---------------------------------------------------------
  if (!whatsapp_number || whatsapp_number === "NULL") {
    Logger.log("Nomor HP kosong → WA tidak dikirim.");
    return;
  }

  //---------------------------------------------------------
  // AMBIL NOMOR URUT (TANPA ERROR)
  //---------------------------------------------------------
  const sheet = e.range.getSheet();
  const NU = sheet.getLastRow() - 1;

  //---------------------------------------------------------
  // FORMAT TANGGAL
  //---------------------------------------------------------
  const var_2 = formatDateSafe(var_2_raw);

  //---------------------------------------------------------
  // KIRIM WHATSAPP
  //---------------------------------------------------------
  sendWhatsAppNotifications({
    nama_lengkap: name,
    nama_panggilan: var_1,
    tanggal_lahir: var_2,
    nomor_hp: whatsapp_number,
    asal_paroki: var_3,
    nomor_urut: NU
  });
}

//---------------------------------------------------------
// FUNGSI SHARE: KIRIM WHATSAPP NOTIFICATION
//---------------------------------------------------------
function sendWhatsAppNotifications(data) {
  // Format nomor HP
  const whatsapp_number = convertToInternationalFormat(data.nomor_hp);
  
  if (!whatsapp_number || whatsapp_number === "NULL") {
    Logger.log("Nomor HP tidak valid → WA tidak dikirim.");
    return;
  }
  
  // Format tanggal lahir
  const formattedBirthDate = formatDateSafe(data.tanggal_lahir);
  
  //---------------------------------------------------------
  // TEMPLATE PESAN UNTUK USER
  //---------------------------------------------------------
  const userMessage = `
*✨PD St. Anna Bulan Januari✨*

Shalom Bapak/Ibu ${data.nama_panggilan}
Registrasi Nomor Urut Anda Adalah *Nomor: ${data.nomor_urut}*
Anda sudah TERDAFTAR, mohon tunjukkan WA ini saat
*PD St. Anna Menteng*
*Kamis 15 Januari 2026*

Jika Anda sudah menerima WA ini,
Mohon WA ini segera di balas/reply dengan :
*YA atau Terima Kasih*

Balasan WA dari Bapak/Ibu untuk memastikan kami bahwa WA sudah sampai.
Jika tidak ada respon, kami asumsikan terjadi kesalahan input nomor & pendaftaran gugur.

*Catatan Tambahan*
1. Sebut Nomor dan Nama Anda di meja pendaftaran untuk kami cek dan ditukar kupon
2. 1 Deret Kursi di gereja muat 12 orang, mohon toleransi dan kerjasamanya.
3. Jika ada pembatalan mohon segera info, Bulan desember kemarin ada 70-an orang tidak hadir tanpa pemberitahuan,Ada 100 box konsumsi lebih.
Jangan daftarkan teman anda, jika tidak pasti datang.
Kasihan Umat yang rindu datang tapi tidak bisa, karena quota penuh.
Marilah kita saling menghargai. Kami berusaha melayani Bpk/ Ibu dengan baik.
4. Mohon simpan nomor ini segera di Kontak anda untuk mencegah nomor kami di suspend karena terlalu banyak Broadcast ke nomor baru.

Terima Kasih! 🙏
`;

  //---------------------------------------------------------
  // TEMPLATE PESAN ADMIN
  //---------------------------------------------------------
  const adminMessage = `
*✨UMAT PD Bulan Januari✨*
Nama : ${data.nama_lengkap}
Panggilan : ${data.nama_panggilan}
Nomor HP : ${whatsapp_number}
Tanggal Lahir : ${formattedBirthDate}
Paroki : ${data.asal_paroki}
Umat No : *${data.nomor_urut}*

SUDAH TERDAFTAR
`;

  //---------------------------------------------------------
  // KIRIM WA KE USER
  //---------------------------------------------------------
  sendMessage(whatsapp_number, userMessage);

  //---------------------------------------------------------
  // KIRIM WA KE ADMIN
  //---------------------------------------------------------
  CONFIG.ADMIN_TARGETS.forEach(t =>
    sendMessage(convertToInternationalFormat(t.trim()), adminMessage)
  );
}

//---------------------------------------------------------
// FUNGSI KIRIM WA
//---------------------------------------------------------
function sendMessage(to, message) {
  const jid = to.includes("@") ? to : to + "@s.whatsapp.net";
  const apiUrl =
    `${CONFIG.BASE_URL}?token=${CONFIG.TOKEN}&instance_id=${CONFIG.INSTANCE_ID}&jid=${jid}` +
    `&msg=${encodeURIComponent(message)}`;

  try {
    const response = UrlFetchApp.fetch(apiUrl, {
      method: "get",
      muteHttpExceptions: true
    });
    Logger.log(response.getContentText());
  } catch (err) {
    Logger.log("Error kirim WA: " + err);
  }
}

//-------------------------------------------------------------
// KONVERSI NOMOR WA INTERNASIONAL
//-------------------------------------------------------------
function convertToInternationalFormat(num) {
  if (!num) return null;
  let s = String(num).trim().replace(/[\s\-\(\)]/g, "");

  if (s.includes("@g.us")) return s;
  if (s.startsWith("+")) s = s.substring(1);
  if (s.startsWith("62")) return s;
  if (s.startsWith("0")) return "62" + s.substring(1);
  if (/^8\d{6,}$/.test(s)) return "62" + s;

  return s;
}

//-------------------------------------------------------------
// FORMAT TANGGAL AMAN UNTUK SEMUA FORMAT
//-------------------------------------------------------------
function formatDateSafe(input) {
  if (!input || input === "NULL" || input === "") return "_Tanggal lahir tidak diisi_";

  const date = new Date(input);
  if (isNaN(date.getTime())) return "_Tanggal lahir tidak valid_";

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
}

// Test function (opsional - untuk testing di Apps Script Editor)
function testDoPost() {
  const testData = {
    parameter: {
      nama_panggilan: 'Budi',
      nama_lengkap: 'Budi Santoso',
      tanggal_lahir: '01/01/1990',
      nomor_hp: '08123456789',
      asal_paroki: 'Paroki St Anna Menteng'
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
