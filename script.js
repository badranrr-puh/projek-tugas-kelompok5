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
const eventSelect =
    document.getElementById("pilihan-kegiatan");

if (eventSelect) {
    events.forEach(event => {
        const option = document.createElement("option");

        option.value = String(event.id);
        option.textContent = event.title;

        eventSelect.appendChild(option);
    });

    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get("id");

    if (getEventById(selectedId)) {
        eventSelect.value = selectedId;
    }
}


/* ===================================
   8. PROSES FORM PENDAFTARAN
=================================== */
const registrationForm =
    document.getElementById("registration-form");

const registrationMessage =
    document.getElementById("registration-message");

if (registrationForm) {
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!registrationForm.reportValidity()) {
            return;
        }

        const nama = document.getElementById("nama")
            .value.trim();

        const nim = document.getElementById("nim")
            .value.trim();

        const email = document.getElementById("email")
            .value.trim();

        const eventId = document.getElementById("pilihan-kegiatan")
            .value;

        const selectedEvent = getEventById(eventId);

        if (!selectedEvent) {
            registrationMessage.textContent =
                "Silakan pilih kegiatan yang tersedia.";

            registrationMessage.className = "form-message error";
            return;
        }

        const registrations = getRegistrations();

        const duplicate = registrations.some(registration =>
            registration.nim === nim &&
            registration.eventId === selectedEvent.id
        );

        if (duplicate) {
            registrationMessage.textContent =
                "NIM ini sudah terdaftar pada kegiatan tersebut.";

            registrationMessage.className = "form-message error";
            return;
        }

        const registration = {
            nama: nama,
            nim: nim,
            email: email,
            eventId: selectedEvent.id,
            eventTitle: selectedEvent.title,
            registeredAt: new Date().toISOString()
        };

        try {
            saveRegistration(registration);

            registrationMessage.textContent =
                "Pendaftaran berhasil! Data tersimpan di browser ini.";

            registrationMessage.className = "form-message success";

            registrationForm.reset();

            renderRegistrations();
        } catch (error) {
            registrationMessage.textContent =
                "Data gagal disimpan. Periksa pengaturan browser.";

            registrationMessage.className = "form-message error";
        }
    });
}

/* ===================================
   9. RIWAYAT PENDAFTARAN
=================================== */
function renderRegistrations() {
    const list = document.getElementById("registration-list");

    if (!list) return;

    const registrations = getRegistrations();

    if (registrations.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                Belum ada pendaftaran pada browser ini.
            </div>
        `;
        return;
    }

    list.replaceChildren();

    registrations.slice().reverse().forEach(registration => {
        const item = document.createElement("article");
        item.className = "registration-item";

        const name = document.createElement("strong");
        name.textContent = registration.nama;

        const eventName = document.createElement("p");
        eventName.textContent =
            "Kegiatan: " + registration.eventTitle;

        const nim = document.createElement("p");
        nim.textContent = "NIM: " + registration.nim;

        const email = document.createElement("p");
        email.textContent = "Email: " + registration.email;

        item.append(name, eventName, nim, email);
        list.appendChild(item);
    });
}

renderRegistrations();
