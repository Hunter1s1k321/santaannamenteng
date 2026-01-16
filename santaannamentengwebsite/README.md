# 📝 Absensi PD St Anna Menteng - HTML Form

## ✅ Status: SIAP DIGUNAKAN!

### 🔗 Informasi Deployment

- **Deployment ID**: `AKfycbzAAcRO2GcWTNhwuEO5ENE0t_iE9SPTHbaqdVoAcvaVlZMwRM0R64wE1sXelfWnkyO9`
- **URL**: `https://script.google.com/macros/s/AKfycbzAAcRO2GcWTNhwuEO5ENE0t_iE9SPTHbaqdVoAcvaVlZMwRM0R64wE1sXelfWnkyO9/exec`
- **Spreadsheet ID**: `1U6p_iVVOLDdyeHqDBrT3mbMInaASKa5EL2UrfXHw4FQ`
- **Sheet Name**: `Absensi PD St Anna Menteng`

---

## 🎯 Fitur

✅ Form HTML yang cantik & responsive  
✅ Validasi input otomatis  
✅ Notifikasi WhatsApp ke user & admin  
✅ **Tampilan nomor urut yang besar & jelas**  
✅ Nomor urut berdasarkan baris spreadsheet - 1  
✅ Auto format nomor HP (0812 → 62812)  
✅ Format tanggal lahir Indonesia  
✅ Terintegrasi dengan Google Form yang sudah ada  

---

## 📋 Cara Menggunakan

### User:
1. Buka file `index.html` di browser
2. Isi form pendaftaran
3. Klik "Submit Absensi"
4. **Nomor urut akan ditampilkan dengan BESAR di layar**
5. Cek WhatsApp untuk konfirmasi

### Admin:
- Semua data masuk ke spreadsheet otomatis
- Admin menerima notifikasi WA di nomor: **08111928287**
- Data bisa diinput dari 2 sumber:
  - Google Form (sistem lama)
  - HTML Form (sistem baru)

---

## 🔢 Sistem Nomor Urut

Nomor urut dihitung dari:
```
Nomor Urut = Jumlah Baris Spreadsheet - 1
```

Contoh:
- Baris 2 (data pertama) → Nomor urut: **1**
- Baris 10 → Nomor urut: **9**
- Baris 101 → Nomor urut: **100**

**Catatan**: Baris 1 adalah header, sehingga tidak dihitung.

---

## 📱 Template WhatsApp

### Untuk User:
```
✨PD St. Anna Bulan Januari✨

Shalom Bapak/Ibu [Nama Panggilan]
Registrasi Nomor Urut Anda Adalah Nomor: [X]
Anda sudah TERDAFTAR...
```

### Untuk Admin:
```
✨UMAT PD Bulan Januari✨
Nama : [Nama Lengkap]
Panggilan : [Nama Panggilan]
Nomor HP : [Nomor HP]
Tanggal Lahir : [Tanggal Lahir]
Paroki : [Asal Paroki]
Umat No : [X]

SUDAH TERDAFTAR
```

---

## 🛠️ File Structure

```
santaannamentengwebsite/
├── index.html                    # Form HTML (READY!)
├── google-apps-script.js         # Kode untuk Apps Script
├── INSTRUKSI_SETUP.txt          # Panduan lengkap setup
└── README.md                     # File ini
```

---

## 🚀 Deploy ke Website

File `index.html` bisa langsung di-upload ke:
- **GitHub Pages** (gratis)
- **Netlify** (gratis)
- **Vercel** (gratis)
- Hosting lainnya

Tidak perlu file tambahan, `index.html` sudah standalone!

---

## 🔐 Keamanan

- URL Apps Script sudah di-encode di kode
- Data langsung masuk ke Google Sheets (secure)
- WhatsApp API menggunakan token terenkripsi
- Form validation untuk mencegah spam

---

## 📞 Kontak Admin WhatsApp

Jika ada perubahan nomor admin, edit di `google-apps-script.js`:

```javascript
const CONFIG = {
  ...
  ADMIN_TARGETS: ["08111928287", "08XXXXXXXXX"], // Tambah nomor di sini
  ...
};
```

Lalu deploy ulang Apps Script.

---

## ✨ Update Terbaru

### v1.0 (16 Januari 2026)
- ✅ Integrasi HTML Form dengan Google Apps Script
- ✅ WhatsApp notification otomatis
- ✅ **Tampilan nomor urut yang besar (48px) dengan style menarik**
- ✅ Support Google Form & HTML Form bersamaan
- ✅ Nomor urut berdasarkan baris spreadsheet - 1

---

## 📝 Testing

Untuk test sistem:
1. Buka `index.html` di browser
2. Isi form dengan data dummy
3. Submit dan cek:
   - Apakah nomor urut muncul dengan BESAR?
   - Apakah data masuk ke spreadsheet?
   - Apakah WA terkirim?

---

## 🙏 Credits

Developed for: **Pemuda-Pemudi St Anna Menteng**  
Integration: HTML Form + Google Apps Script + WhatsApp API  
Status: **Production Ready** ✅

---

**Selamat menggunakan! 🎉**
