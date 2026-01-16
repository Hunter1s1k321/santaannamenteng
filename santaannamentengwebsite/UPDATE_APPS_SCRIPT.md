# UPDATE GOOGLE APPS SCRIPT - QUERY NOMOR URUT

## ⚠️ PENTING: DEPLOY ULANG DIPERLUKAN

File `google-apps-script.js` telah diupdate dengan fungsi baru untuk query nomor urut dari spreadsheet.

## 📋 Perubahan yang Dilakukan:

### 1. **Ditambahkan Fungsi `doGet()`**
Fungsi baru untuk handle GET request dari success.html

### 2. **Ditambahkan Fungsi `getQueueNumberByData()`**
Fungsi untuk mencari nomor urut user berdasarkan:
- Nomor HP (required)
- Nama Lengkap (optional, untuk validasi tambahan)

### 3. **Cara Kerja:**
```
User submit form → Data masuk spreadsheet → Redirect ke success.html
Success.html → Query ke Apps Script dengan nomor HP → Cari di spreadsheet
Spreadsheet → Return nomor urut yang sesuai → Display di success.html
```

## 🚀 CARA DEPLOY ULANG:

### Step 1: Buka Google Apps Script Editor
1. Buka spreadsheet Anda: https://docs.google.com/spreadsheets/d/1U6p_iVVOLDdyeHqDBrT3mbMInaASKa5EL2UrfXHw4FQ
2. Klik **Extensions** → **Apps Script**

### Step 2: Replace Script
1. Di Apps Script Editor, **hapus semua kode yang lama**
2. Copy **SEMUA isi** dari file `google-apps-script.js`
3. Paste di Apps Script Editor
4. Klik **Save** (icon disket atau Ctrl+S)

### Step 3: Deploy Ulang
1. Klik **Deploy** → **Manage deployments**
2. Klik icon **pencil/edit** di deployment yang aktif
3. Di bagian **New version**, pilih **New version**
4. Klik **Deploy**
5. **URL tidak berubah** - tetap menggunakan URL yang sama

### Step 4: Test
URL deployment tetap:
```
https://script.google.com/macros/s/AKfycbzAAcRO2GcWTNhwuEO5ENE0t_iE9SPTHbaqdVoAcvaVlZMwRM0R64wE1sXelfWnkyO9/exec
```

Test query nomor urut:
```
https://script.google.com/macros/s/AKfycbzAAcRO2GcWTNhwuEO5ENE0t_iE9SPTHbaqdVoAcvaVlZMwRM0R64wE1sXelfWnkyO9/exec?action=getQueueNumber&nomor_hp=08123456789&nama_lengkap=Budi%20Santoso
```

## ✅ Perubahan File HTML:

### 1. **index.html & contact.html**
- ✅ Logo header diganti dari cross (†) menjadi image: `./assets/logobackground.jpeg`
- ✅ Logo berukuran 45x45px dengan border radius 8px
- ✅ Fallback ke cross jika gambar tidak load

### 2. **success.html**
- ✅ Script baru untuk fetch nomor urut dari spreadsheet
- ✅ Support URL params (untuk refresh/reload page)
- ✅ Query berdasarkan nomor HP + nama lengkap
- ✅ Fallback ke nomor estimasi jika API gagal

## 🔄 Alur Kerja Baru:

### Scenario 1: Submit Form Baru
```
User isi form → Submit → Data masuk spreadsheet
→ Redirect ke success.html dengan sessionStorage
→ Success.html query API dengan nomor HP user
→ API cari di spreadsheet baris yang match
→ Return nomor urut = nomor baris (row number)
→ Display nomor urut di success.html
```

### Scenario 2: Reload Page
```
User reload success.html → Check sessionStorage
→ Jika ada data, query API lagi
→ Return nomor urut yang sama dari spreadsheet
→ Display nomor urut yang konsisten
```

### Scenario 3: Akses dengan URL Params
```
User buka: success.html?nomor_hp=08123456789&nama_lengkap=Budi
→ Parse URL params
→ Query API dengan data dari URL
→ Return nomor urut dari spreadsheet
→ Display data user + nomor urut
```

## 📌 Catatan Penting:

1. **Nomor Urut = Row Number** di spreadsheet (row 1 = header, row 2 = nomor urut 1, dst)
2. **Pencarian fleksibel**: Normalisasi nomor HP (hapus spasi, tanda kurung, dash)
3. **Validasi ganda**: Check nomor HP + nama lengkap untuk akurasi
4. **Error handling**: Fallback ke nomor estimasi jika API error
5. **URL tidak berubah**: Deploy ulang tidak mengubah URL deployment

## 🎯 Testing Checklist:

- [ ] Deploy ulang Google Apps Script berhasil
- [ ] Test submit form baru → nomor urut muncul
- [ ] Test reload success.html → nomor urut tetap sama
- [ ] Test dengan nomor HP berbeda → nomor urut berbeda
- [ ] Logo header muncul di index.html dan contact.html
- [ ] Fallback logo ke cross jika image error

## 📞 Troubleshooting:

### Error: "Sheet tidak ditemukan"
- Pastikan CONFIG.SHEET_NAME = 'Form responses 1' (sesuai nama sheet)

### Error: "Data tidak ditemukan"
- Check format nomor HP di spreadsheet vs input user
- Pastikan data sudah tersimpan di spreadsheet

### Nomor urut selalu estimasi (random)
- Check console browser untuk error API
- Pastikan deploy ulang sudah dilakukan
- Test URL API langsung di browser

---

**Selesai!** 🎉
Sekarang nomor urut akan selalu akurat dari spreadsheet, bahkan saat reload page.
