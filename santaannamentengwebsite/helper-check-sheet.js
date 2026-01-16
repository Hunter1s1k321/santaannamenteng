// ========================================
// HELPER SCRIPT - CEK NAMA SHEET
// ========================================
// Jalankan function ini di Apps Script Editor untuk melihat nama sheet yang benar

function listAllSheets() {
  const spreadsheet = SpreadsheetApp.openById('1U6p_iVVOLDdyeHqDBrT3mbMInaASKa5EL2UrfXHw4FQ');
  const sheets = spreadsheet.getSheets();
  
  Logger.log('=== DAFTAR SEMUA SHEET ===');
  Logger.log('Total sheet: ' + sheets.length);
  Logger.log('');
  
  sheets.forEach((sheet, index) => {
    const name = sheet.getName();
    const numRows = sheet.getLastRow();
    const numCols = sheet.getLastColumn();
    
    Logger.log(`Sheet ${index + 1}:`);
    Logger.log(`  Nama: "${name}"`);
    Logger.log(`  Panjang nama: ${name.length} karakter`);
    Logger.log(`  Jumlah baris: ${numRows}`);
    Logger.log(`  Jumlah kolom: ${numCols}`);
    Logger.log('');
  });
  
  // Return nama sheet pertama
  const firstSheetName = sheets[0].getName();
  Logger.log('>>> COPY NAMA INI KE CONFIG: "' + firstSheetName + '"');
  
  return firstSheetName;
}

// Test function untuk cek koneksi
function testConnection() {
  try {
    const spreadsheet = SpreadsheetApp.openById('1U6p_iVVOLDdyeHqDBrT3mbMInaASKa5EL2UrfXHw4FQ');
    Logger.log('✅ Spreadsheet berhasil dibuka!');
    Logger.log('Nama: ' + spreadsheet.getName());
    
    const sheets = spreadsheet.getSheets();
    Logger.log('Jumlah sheet: ' + sheets.length);
    
    return true;
  } catch (error) {
    Logger.log('❌ Error: ' + error);
    return false;
  }
}

// CARA PAKAI:
// 1. Buka Apps Script Editor
// 2. Paste kode ini di file baru (atau di file yang sama)
// 3. Pilih function: listAllSheets
// 4. Klik Run
// 5. Lihat hasil di View → Logs
// 6. Copy nama sheet yang benar ke CONFIG.SHEET_NAME
