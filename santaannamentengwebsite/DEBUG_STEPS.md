# 🔍 DEBUGGING CHECKLIST - Data Tidak Masuk Spreadsheet

## ❌ Masalah: 
Form HTML menunjukkan "berhasil" tapi data tidak masuk ke spreadsheet

---

## ✅ LANGKAH DEBUGGING:

### 1. UPDATE APPS SCRIPT (WAJIB!)

File `google-apps-script.js` sudah diupdate dengan:
- ✅ Menambah kolom ke-7 (Column 1)
- ✅ Format tanggal lahir DD/MM/YYYY
- ✅ Logging untuk debugging

**ACTION REQUIRED:**
1. Buka Google Spreadsheet
2. Extensions → Apps Script
3. **GANTI SEMUA kode** dengan kode baru dari `google-apps-script.js`
4. **SAVE** (Ctrl+S)
5. **DEPLOY ULANG**:
   - Deploy → Manage deployments
   - Klik ✏️ (Edit) pada deployment yang aktif
   - Version: **New version**
   - Description: "Fix column count"
   - **Deploy**

⚠️ **PENTING**: Tidak perlu URL baru, cukup update version!

---

### 2. TEST DENGAN TEST-FORM.HTML

Gunakan `test-form.html` untuk test sederhana:

1. Buka file `test-form.html` di browser
2. **GANTI nomor HP** dengan nomor asli Anda
3. Klik "Test Submit"
4. Tab baru akan terbuka dengan response JSON

**Cek Response:**
- ✅ Status: "success" → Apps Script OK
- ❌ Status: "error" → Ada masalah di Apps Script

---

### 3. CEK APPS SCRIPT EXECUTION LOG

1. Buka https://script.google.com/home
2. Pilih project "Absensi PD St Anna Menteng"
3. Menu sebelah kiri: **Executions** (icon ⏱️)
4. Lihat execution terakhir:
   - ✅ Status: Completed → Berhasil
   - ❌ Status: Failed → Klik untuk lihat error

**Log yang Diharapkan:**
```
Data yang dikirim: {"nama_panggilan":"TestBudi",...}
Row data: [timestamp,"TestBudi","Test Budi Santoso",...]
```

---

### 4. CEK NAMA SHEET

Pastikan nama sheet **PERSIS SAMA** dengan kode:

**Di Spreadsheet:**
- Tab name: `Absensi PD St Anna Menteng`

**Di Apps Script:**
```javascript
SHEET_NAME: 'Absensi PD St Anna Menteng'
```

⚠️ Harus sama persis (case sensitive, spasi, dll)!

---

### 5. CEK HEADER KOLOM SPREADSHEET

Dari screenshot, header spreadsheet punya 7 kolom:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Nama panggilan | Nama Lengkap | Tanggal Lahir (...) | Nomor HP | Asal Paroki/Gereja | Column 1 |

Kode Apps Script yang baru sudah sesuai dengan 7 kolom ini.

---

### 6. CEK IZIN APPS SCRIPT

Pastikan Apps Script punya izin akses spreadsheet:

1. Di Apps Script Editor
2. Klik **Run** (pilih function: doPost)
3. Jika muncul popup authorization:
   - Klik "Review permissions"
   - Pilih akun Google
   - Klik "Allow"

---

### 7. TEST MANUAL DI APPS SCRIPT EDITOR

Test fungsi `testDoPost()`:

1. Di Apps Script Editor
2. Pilih function dropdown: **testDoPost**
3. Klik **Run** (▶️)
4. Lihat log: View → Logs
5. Cek spreadsheet → data harus masuk

Jika test ini berhasil → Apps Script OK, masalah di form HTML
Jika test ini gagal → Masalah di Apps Script

---

## 🎯 CHECKLIST VERIFIKASI:

Centang setiap langkah setelah selesai:

- [ ] Apps Script sudah diupdate dengan kode baru
- [ ] Apps Script sudah di-deploy ulang (new version)
- [ ] Test dengan test-form.html berhasil
- [ ] Response JSON menunjukkan "success"
- [ ] Data masuk ke spreadsheet
- [ ] Execution log tidak ada error
- [ ] Nama sheet sudah benar persis
- [ ] Header spreadsheet ada 7 kolom
- [ ] testDoPost() berhasil dijalankan

---

## 📊 EXPECTED RESULT:

Setelah submit test-form.html:

1. **Browser Tab Baru:**
   ```json
   {
     "status": "success",
     "message": "Data berhasil disimpan! Nomor urut Anda: 549",
     "nomor_urut": 549
   }
   ```

2. **Spreadsheet:**
   - Baris baru muncul di bawah
   - Data terisi lengkap

3. **WhatsApp:**
   - User dapat pesan dengan nomor urut
   - Admin dapat notifikasi

---

## 🆘 JIKA MASIH GAGAL:

Kirim screenshot:
1. Response JSON dari test-form.html
2. Apps Script Execution Log (View → Executions)
3. Error message (jika ada)
4. Baris terakhir spreadsheet

---

**Silakan coba test-form.html dulu dan lihat response-nya!** 🚀
