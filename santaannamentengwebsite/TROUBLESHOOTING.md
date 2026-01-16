# 🔧 TROUBLESHOOTING - Failed to Fetch Error

## ❌ Error: "Terjadi kesalahan: Failed to fetch"

### 📋 Penyebab Umum:

1. **CORS Policy** - Browser memblokir request dari file lokal (file://)
2. **Apps Script belum di-deploy dengan benar**
3. **Setting "Who has access" bukan "Anyone"**
4. **Internet tidak terkoneksi**

---

## ✅ SOLUSI SUDAH DITERAPKAN

Saya sudah update `index.html` dengan metode **iframe hidden form submit** yang bypass CORS.

### Cara Kerja:
- Form tidak menggunakan `fetch()` lagi
- Menggunakan iframe tersembunyi untuk submit
- Data tetap masuk ke spreadsheet
- Nomor urut dikirim via WhatsApp

---

## 🧪 TEST ULANG

1. **Refresh browser** (Ctrl + F5)
2. **Isi form** dengan data test:
   - Nama Panggilan: Budi
   - Nama Lengkap: Budi Santoso
   - Nomor HP: 08123456789 (ganti dengan nomor asli untuk test WA)
   - Asal Paroki: Test

3. **Klik Submit**

4. **Cek hasil**:
   - ✅ Muncul pesan "Pendaftaran Berhasil"
   - ✅ Cek spreadsheet → data masuk
   - ✅ Cek WhatsApp → dapat nomor urut

---

## 🔍 CEK APPS SCRIPT DEPLOYMENT

Pastikan Apps Script sudah di-deploy dengan benar:

### Langkah Cek:

1. Buka Google Spreadsheet Anda
2. **Extensions** → **Apps Script**
3. Klik **Deploy** → **Manage deployments**
4. Pastikan ada deployment yang **Active**
5. Cek setting:
   ```
   ✅ Execute as: Me (email Anda)
   ✅ Who has access: Anyone
   ```

### Jika Belum Ada Deployment:

1. **Deploy** → **New deployment**
2. Klik icon ⚙️ → Pilih **Web app**
3. Setting:
   - Description: Absensi Form
   - Execute as: **Me**
   - Who has access: **Anyone** ← PENTING!
4. **Deploy**
5. **Copy URL** yang baru
6. Ganti di `index.html` baris 212

---

## 🌐 SOLUSI ALTERNATIF: Deploy ke Hosting

Jika masih error, deploy HTML ke hosting gratis:

### Opsi 1: GitHub Pages (Recommended)

1. Buat repo GitHub
2. Upload `index.html`
3. Setting → Pages → Enable
4. Akses via `https://username.github.io/repo-name`

### Opsi 2: Netlify Drop

1. Buka https://app.netlify.com/drop
2. Drag & drop file `index.html`
3. Dapat URL instant

### Opsi 3: Local Server (Untuk Test)

Jalankan di terminal:

```powershell
# Pastikan Python terinstall
python -m http.server 8000
```

Lalu buka: `http://localhost:8000/index.html`

---

## 📱 CEK WHATSAPP API

Pastikan WhatsApp API masih aktif:

### Test Manual:

Buka URL ini di browser (ganti [NOMOR] dengan nomor test):

```
https://crm.chatera.id/api/v1/send-text?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ2OXpNdDlSaHFWVnhFclUyb0RLVXNsR3Byd3Q1Qks1RyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1MTI4OTQ5fQ.X2eHa5OrzRsR2mr0NdY_BEyqm_72Nsy4iPBZGQtfZss&instance_id=eyJ1aWQiOiJ2OXpNdDlSaHFWVnhFclUyb0RLVXNsR3Byd3Q1Qks1RyIsImNsaWVudF9pZCI6IlBEIFN0LkFubmEgTWVudGVuZyJ9&jid=62812XXXXXXXX@s.whatsapp.net&msg=Test
```

Jika dapat response sukses → API aktif ✅

---

## 🔄 RESET DEPLOYMENT (Jika Perlu)

Jika deployment bermasalah:

1. Apps Script Editor
2. **Deploy** → **Manage deployments**
3. Klik **Archive** pada deployment lama
4. Buat **New deployment** baru
5. Copy URL baru
6. Update di `index.html`

---

## 📞 Quick Test

Test langsung Apps Script tanpa form:

1. Di Apps Script Editor
2. Pilih function: `testDoPost`
3. Klik **Run**
4. Lihat **Execution log** (View → Logs)
5. Cek apakah ada error

Jika berhasil → Apps Script OK ✅  
Jika error → Lihat pesan error di log

---

## 💡 CATATAN PENTING

Dengan update terbaru:
- ✅ Form menggunakan iframe submit (bypass CORS)
- ✅ Data tetap masuk ke spreadsheet
- ✅ WhatsApp tetap terkirim
- ✅ Nomor urut dikirim via WA (bukan di layar)

Jadi user akan:
1. Submit form
2. Dapat pesan "Berhasil"
3. Cek WhatsApp untuk nomor urut

---

## 🆘 Masih Error?

Screenshoot:
1. Pesan error di browser
2. Console browser (F12 → Console tab)
3. Apps Script execution log

Lalu kirimkan untuk diagnosis lebih lanjut.

---

**Good luck! 🚀**
