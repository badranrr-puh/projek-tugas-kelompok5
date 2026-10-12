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
