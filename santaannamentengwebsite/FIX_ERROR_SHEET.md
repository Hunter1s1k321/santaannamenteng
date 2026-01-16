# 🔧 FIX ERROR: Cannot read properties of null (reading 'appendRow')

## ❌ Error yang Terjadi:
```
TypeError: Cannot read properties of null (reading 'appendRow')
```

## 🔍 Penyebab:
Apps Script **tidak bisa menemukan sheet** karena nama sheet di kode tidak sama persis dengan nama sheet di spreadsheet.

---

## ✅ SOLUSI - CARA 1: AUTO DETECT (TERCEPAT)

Saya akan ubah kode agar menggunakan **sheet pertama** secara otomatis, tidak peduli namanya.

### Update Kode Apps Script:

Ganti bagian ini di `google-apps-script.js`:

```javascript
// DARI:
const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

// JADI:
// Gunakan sheet pertama (index 0)
const sheet = spreadsheet.getSheets()[0];
```

Atau gunakan kode yang sudah saya update dengan error handling yang lebih baik.

---

## ✅ SOLUSI - CARA 2: CEK NAMA SHEET YANG BENAR

### Langkah 1: Cek Nama Sheet

1. Buka Apps Script Editor
2. Copy isi file `helper-check-sheet.js` ke Apps Script
3. Pilih function: **listAllSheets**
4. Klik **Run** (▶️)
5. Lihat hasil: **View → Logs**

Output akan seperti ini:
```
=== DAFTAR SEMUA SHEET ===
Total sheet: 1

Sheet 1:
  Nama: "Absensi PD St Anna Menteng"
  Panjang nama: 26 karakter
  Jumlah baris: 548
  Jumlah kolom: 7

>>> COPY NAMA INI KE CONFIG: "Absensi PD St Anna Menteng"
```

### Langkah 2: Update CONFIG

Copy nama yang **PERSIS SAMA** (dengan tanda kutip) dan paste ke `CONFIG.SHEET_NAME`:

```javascript
const CONFIG = {
  SPREADSHEET_ID: '1U6p_iVVOLDdyeHqDBrT3mbMInaASKa5EL2UrfXHw4FQ',
  SHEET_NAME: 'PASTE_NAMA_SHEET_DISINI', // ← Ganti dengan nama yang benar
  ...
};
```

---

## ✅ SOLUSI - CARA 3: GUNAKAN KODE YANG SUDAH SAYA UPDATE

Saya sudah update `google-apps-script.js` dengan error handling yang memberikan info detail:

**Sekarang jika sheet tidak ditemukan, error message akan menunjukkan:**
- Nama sheet yang dicari
- Daftar semua sheet yang ada

Ini akan membantu Anda tahu nama sheet yang benar.

---

## 🚀 ACTION PLAN:

### Opsi A: Quick Fix (Recommended)

1. **Update Apps Script** dengan kode baru dari `google-apps-script.js` (yang sudah saya edit)
2. **Deploy ulang** (new version)
3. **Test lagi** dengan test-form.html
4. Error message sekarang akan **menunjukkan nama sheet yang tersedia**
5. Copy nama yang benar dan update CONFIG

### Opsi B: Manual Check

1. Buka spreadsheet Anda
2. Lihat **nama tab** di bawah
3. Klik kanan pada tab → **Rename** → Copy nama yang ada
4. Paste ke CONFIG.SHEET_NAME di Apps Script
5. Deploy ulang

---

## 🎯 KODE YANG SUDAH DIUPDATE:

File `google-apps-script.js` sekarang punya validasi:

```javascript
// Cek apakah sheet ditemukan
if (!sheet) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Sheet tidak ditemukan! Yang dicari: "' + CONFIG.SHEET_NAME + 
               '". Sheet yang ada: [' + sheetNames + ']'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 📋 NEXT STEPS:

1. ✅ Copy kode baru dari `google-apps-script.js`
2. ✅ Paste ke Apps Script Editor
3. ✅ Save (Ctrl+S)
4. ✅ Deploy → Manage deployments → Edit → New version → Deploy
5. ✅ Test lagi dengan test-form.html
6. ✅ Lihat error message yang **lebih detail**
7. ✅ Update CONFIG.SHEET_NAME dengan nama yang benar
8. ✅ Deploy lagi
9. ✅ Test lagi → Harus berhasil! ✅

---

**Silakan update Apps Script dengan kode baru dan test lagi!** 🚀

Error message sekarang akan kasih tau nama sheet yang benar.
