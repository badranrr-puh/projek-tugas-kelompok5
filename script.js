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
const allEventsContainer =
    document.getElementById("all-events");

const searchInput =
    document.getElementById("search-event");

const categoryFilter =
    document.getElementById("filter-category");

const eventCount =
    document.getElementById("event-count");

function renderEvents() {
    if (!allEventsContainer) return;

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    const category = categoryFilter.value;

    const filteredEvents = events.filter(event => {
        const matchesKeyword =
            event.title.toLowerCase().includes(keyword) ||
            event.description.toLowerCase().includes(keyword);

        const matchesCategory =
            category === "Semua" ||
            event.category === category;

        return matchesKeyword && matchesCategory;
    });

    eventCount.textContent =
        `Menampilkan ${filteredEvents.length} kegiatan`;

    if (filteredEvents.length === 0) {
        allEventsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Kegiatan tidak ditemukan</h3>
                <p>Coba gunakan kata kunci atau kategori lain.</p>
            </div>
        `;
        return;
    }

    allEventsContainer.innerHTML =
        filteredEvents.map(eventCard).join("");
}

if (allEventsContainer) {
    searchInput.addEventListener("input", renderEvents);
    categoryFilter.addEventListener("change", renderEvents);

    renderEvents();
}

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
function getRegistrations() {
    try {
        const data = localStorage.getItem("kampusEventRegistrations");
        const parsed = data ? JSON.parse(data) : [];

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function saveRegistration(registration) {
    const registrations = getRegistrations();

    registrations.push(registration);

    localStorage.setItem(
        "kampusEventRegistrations",
        JSON.stringify(registrations)
    );
}

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
