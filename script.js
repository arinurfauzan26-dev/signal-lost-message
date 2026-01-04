// --- PENGATURAN TANGGAL (OTOMATIS 3 MENIT YANG LALU) ---
// Kita ambil waktu sekarang, lalu dimundurkan 3 menit
const lastContactDate = new Date();
lastContactDate.setMinutes(lastContactDate.getMinutes() - 0);

// --- SISA KODE KE BAWAH TETAP SAMA ---
function updateTimer() {
    const now = new Date();
    const diff = now - lastContactDate; 

    // Konversi milidetik ke hari, jam, menit, detik
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Menampilkan ke layar
    document.getElementById("timer").innerHTML = 
        `${days}h ${hours}j ${minutes}m ${seconds}d`;
}

// Jalankan timer setiap 1 detik
setInterval(updateTimer, 1000);
updateTimer();

function reconnect() {
    const btn = document.getElementById("btn-action");
    const initialText = document.getElementById("initial-text");
    const secretMsg = document.getElementById("secret-message");
    const music = document.getElementById("bg-music");

    // Ubah tombol jadi status loading
    btn.innerHTML = "SEARCHING...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // Efek titik-titik bergerak (...)
    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        btn.innerHTML = "SEARCHING" + ".".repeat(dots);
    }, 400);

    // Setelah 3.5 detik, tampilkan pesan rahasia
    setTimeout(() => {
        clearInterval(interval);
        
        // Sembunyikan tombol dan teks awal
        btn.style.display = "none";
        initialText.style.display = "none";
        
        // Munculkan pesan rahasia
        secretMsg.style.display = "block";
        
        // Coba putar musik (browser kadang memblokir autoplay tanpa interaksi)
        music.volume = 0.4;
        music.play().catch(error => console.log("Audio play failed (user interaction needed)"));
        
    }, 3500);}
