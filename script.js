/* ===================================
   1. DATA KEGIATAN
=================================== */


/* ===================================
   2. FUNGSI BANTU
=================================== */


/* ===================================
   3. MENAMPILKAN BERANDA
=================================== */


/* ===================================
   4. DAFTAR DAN FILTER KEGIATAN
=================================== */


/* ===================================
   5. DETAIL KEGIATAN
=================================== */
const detailContainer =
    document.getElementById("event-detail");

if (detailContainer) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const event = getEventById(id);

    if (event) {
        detailContainer.innerHTML = `
            <div class="detail-cover" aria-hidden="true">
                ${event.icon}
            </div>

            <span class="category">
                ${event.category}
            </span>

            <h1>${event.title}</h1>

            <p class="detail-description">
                ${event.description}
            </p>

            <div class="detail-meta">
                <div class="meta-item">
                    <strong>📅 Tanggal</strong>
                    ${formatDate(event.date)}
                </div>

                <div class="meta-item">
                    <strong>🕒 Waktu</strong>
                    ${event.time}
                </div>

                <div class="meta-item">
                    <strong>📍 Lokasi</strong>
                    ${event.location}
                </div>

                <div class="meta-item">
                    <strong>🏷️ Kategori</strong>
                    ${event.category}
                </div>
            </div>

            <a
                href="daftar.html?id=${event.id}"
                class="btn"
            >
                Daftar Kegiatan
            </a>
        `;

        document.title = event.title + " - KampusEvent";
    } else {
        detailContainer.innerHTML = `
            <div class="empty-state">
                <h2>Kegiatan tidak ditemukan</h2>
                <p>Silakan pilih kegiatan dari daftar.</p>
                <br>
                <a href="kegiatan.html" class="btn">
                    Kembali ke Kegiatan
                </a>
            </div>
        `;
    }
}


/* ===================================
   6. PENYIMPANAN PENDAFTARAN
=================================== */


/* ===================================
   7. PILIHAN KEGIATAN DI FORM
=================================== */


/* ===================================
   8. PROSES FORM PENDAFTARAN
=================================== */


/* ===================================
   9. RIWAYAT PENDAFTARAN
=================================== */

