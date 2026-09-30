require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3001;
const API_KEY = process.env.MAPTILER_KEY;

app.use(express.static(path.join(__dirname, "public")));

// Ambil nama wilayah dari context (atau dari fitur itu sendiri) berdasarkan tipe
function pick(f, types) {
    for (const t of types) {
        if ((f.place_type || []).includes(t)) return f.text;
        const c = (f.context || []).find(x => String(x.id).split(".")[0] === t);
        if (c) return c.text;
    }
    return "-";
}

// Contoh: http://localhost:3001/api/lokasi?q=Kasihan
app.get("/api/lokasi", async (req, res) => {
    const kota = (req.query.q || "").trim();

    if (!API_KEY) {
        return res.status(500).json({ message: "MAPTILER_KEY belum diisi di file .env" });
    }
    if (!kota) {
        return res.status(400).json({ message: "Parameter q (lokasi) wajib diisi" });
    }

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(kota)}.json`;

    try {
        const response = await axios.get(url, {
            params: { key: API_KEY, language: "id", limit: 5 }
        });
        console.log(response.data); // tampilkan data hasil geocoding di console

        const hasil = response.data.features.map(f => ({
            lokasi: f.place_name,
            negara: pick(f, ["country"]),
            provinsi: pick(f, ["region"]),
            kecamatan: pick(f, ["municipality", "joint_municipality", "locality", "county", "subregion"]),
            longitude: f.center[0],
            latitude: f.center[1],
            tipe: (f.place_type || ["-"])[0]
        }));

        if (!hasil.length) {
            return res.status(404).json({ message: `Lokasi "${kota}" tidak ditemukan` });
        }
        res.json({ query: kota, hasil });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Gagal mengambil data dari MapTiler" });
    }
});

// Proxy gambar peta supaya API key tidak terlihat di browser
app.get("/api/peta", async (req, res) => {
    const lon = parseFloat(req.query.lon);
    const lat = parseFloat(req.query.lat);
    if (Number.isNaN(lon) || Number.isNaN(lat)) {
        return res.status(400).json({ message: "lon dan lat wajib berupa angka" });
    }
    try {
        const url = `https://api.maptiler.com/maps/streets-v2/static/${lon},${lat},12/600x480.png`;
        const r = await axios.get(url, {
            params: { key: API_KEY, markers: `${lon},${lat}` },
            responseType: "arraybuffer"
        });
        res.set("Content-Type", "image/png").send(r.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Gagal memuat peta" });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
