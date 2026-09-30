Nama : Nur Azizah Ulinnuha
NIM : 20240140252

Aplikasi web untuk mencari lokasi lewat **MapTiler Geocoding API**, dibuat dengan Node.js + Express.
Masukkan nama tempat, lalu tampil: negara, provinsi, kecamatan, longitude, dan latitude.

## Cara menjalankan

1. Install dependensi:
   ```bash
   npm install
   ```
2. Buat API key gratis di https://cloud.maptiler.com/account/keys/
3. Salin `.env.example` menjadi `.env`, lalu isi `MAPTILER_KEY` dengan key kamu.
4. Jalankan server:
   ```bash
   node app.js
   ```
5. Buka http://localhost:3001

## Endpoint

| Endpoint | Fungsi |
|---|---|
| `GET /api/lokasi?q={lokasi}` | Mengembalikan negara, provinsi, kecamatan, longitude, latitude |
| `GET /api/peta?lon={lon}&lat={lat}` | Gambar peta lokasi (API key tetap di server) |

Contoh: `http://localhost:3001/api/lokasi?q=Kasihan`

## Screenshot

### Tampilan web
![Tampilan web](<img width="959" height="509" alt="image" src="https://github.com/user-attachments/assets/a076cf4b-6d5b-47ec-9fce-369a72d3b796" />
)

### Hasil GET di browser / Postman
![Hasil GET](<img width="959" height="512" alt="image" src="https://github.com/user-attachments/assets/a319b986-36fb-4818-b7af-a735c519d2a4" />
)

## Teknologi

Node.js, Express, Axios, dotenv, HTML, CSS, JavaScript, MapTiler Geocoding & Static Maps API.
