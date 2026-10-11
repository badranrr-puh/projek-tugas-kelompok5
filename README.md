# projek-tugas-kelompok5

 LANGKAH AWAL SETELAH CLONE REPOSITORIES
 1. Setiap Anggota wajib membuat branch sebelum menambahkan kode
    git switch main
    git pull origin main
    git switch -c fitur-beranda <= contoh /ubah fitur sesuai bagian masing-masing
 2. Setelah selesai menambahkan kode atau mengubah kode wajib menyimpan perubahan

    git add .
    git commit -m "Menambahkan halaman beranda" /wajib menambahkan komentar
    git push -u origin fitur-beranda /ubah fitur sesuai nama bagian masing-masing

 3. Setelah menyimpan kode perubahan lakukan penggabungan melalui PULL REQUEST (cek/uji terlebih dahulu kode yang sudah anda buat)

    1. Buka repository di GitHub.
    2. Klik Compare & pull request jika muncul, atau buka menu Pull requests lalu pilih New pull request.
    3. Pastikan branch tujuan adalah main dan branch sumber adalah branch fitur anggota.
    4. Tulis ringkasan perubahan.