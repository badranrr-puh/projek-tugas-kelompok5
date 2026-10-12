/* ===================================
   1. DATA KEGIATAN
=================================== */
const events = [
    {
        id: 1,
        title: "Seminar Teknologi AI",
        category: "Seminar",
        date: "2026-11-10",
        time: "09.00 WIB",
        location: "Auditorium Kampus",
        icon: "🤖",
        description:
            "Seminar mengenai perkembangan Artificial Intelligence, " +
            "pemanfaatannya dalam kehidupan sehari-hari, dan peluang " +
            "karier di bidang teknologi."
    },
    {
        id: 2,
        title: "Workshop Web Development",
        category: "Workshop",
        date: "2026-11-15",
        time: "13.00 WIB",
        location: "Laboratorium Komputer",
        icon: "💻",
        description:
            "Workshop pengembangan website menggunakan HTML, CSS, " +
            "dan JavaScript. Peserta akan mempelajari dasar pembuatan " +
            "website dan mencoba membuat halaman web sederhana."
    },
    {
        id: 3,
        title: "Lomba Desain UI/UX",
        category: "Lomba",
        date: "2026-11-20",
        time: "08.00 WIB",
        location: "Gedung Fakultas",
        icon: "🎨",
        description:
            "Kompetisi desain antarmuka dan pengalaman pengguna. " +
            "Peserta dapat mengembangkan kreativitas serta kemampuan " +
            "merancang solusi digital yang mudah digunakan."
    },
    {
        id: 4,
        title: "Seminar Karier Digital",
        category: "Seminar",
        date: "2026-11-25",
        time: "10.00 WIB",
        location: "Ruang Seminar Kampus",
        icon: "🚀",
        description:
            "Mengenal peluang karier di dunia digital, persiapan " +
            "portofolio, dan keterampilan yang dibutuhkan untuk " +
            "memasuki dunia kerja."
    },
    {
        id: 5,
        title: "Pelatihan Dasar Git",
        category: "Workshop",
        date: "2026-12-02",
        time: "09.00 WIB",
        location: "Laboratorium Komputer",
        icon: "🛠️",
        description:
            "Belajar menggunakan Git untuk mencatat perubahan kode, " +
            "mengelola versi proyek, dan berkolaborasi dengan anggota " +
            "tim dalam pengembangan perangkat lunak."
    },
    {
        id: 6,
        title: "Makrab Teknik Informatika",
        category: "Organisasi",
        date: "2026-12-10",
        time: "16.00 WIB",
        location: "Area Kegiatan Kampus",
        icon: "🤝",
        description:
            "Kegiatan untuk mempererat hubungan antar mahasiswa, " +
            "membangun solidaritas, dan meningkatkan kerja sama " +
            "dalam keluarga besar Teknik Informatika."
    }
];

/* ===================================
   2. FUNGSI BANTU
=================================== */
function formatDate(dateString) {
    const date = new Date(dateString + "T12:00:00");

    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}

function getEventById(id) {
    return events.find(event => event.id === Number(id));
}

function eventCard(event) {
    return `
        <article class="event-card">
            <div class="event-cover" aria-hidden="true">
                ${event.icon}
            </div>

            <div class="event-content">
                <span class="category">
                    ${event.category}
                </span>

                <h3>${event.title}</h3>

                <p class="event-meta">
                    📅 ${formatDate(event.date)}
                </p>

                <p class="event-meta">
                    📍 ${event.location}
                </p>

                <p class="event-description">
                    ${event.description}
                </p>

                <a
                    href="detail.html?id=${event.id}"
                    class="btn"
                >
                    Lihat Detail
                </a>
            </div>
        </article>
    `;
}

/* ===================================
   3. MENAMPILKAN BERANDA
=================================== */
const featuredContainer =
    document.getElementById("featured-events");

if (featuredContainer) {
    featuredContainer.innerHTML = events
        .slice(0, 3)
        .map(eventCard)
        .join("");
}

/* ===================================
   4. DAFTAR DAN FILTER KEGIATAN
=================================== */


/* ===================================
   5. DETAIL KEGIATAN
=================================== */



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

