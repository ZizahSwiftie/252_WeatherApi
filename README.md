# 3NIMBelakang_WeatherApi

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
![Tampilan web](screenshots/web.png)

### Hasil GET di browser / Postman
![Hasil GET](screenshots/get-api.png)

## Teknologi

Node.js, Express, Axios, dotenv, HTML, CSS, JavaScript, MapTiler Geocoding & Static Maps API.
