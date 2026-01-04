// 1. Setup Timer (Set ke 3 menit yang lalu)
const lastContactDate = new Date();
lastContactDate.setMinutes(lastContactDate.getMinutes() - 3);

function updateTimer() {
    const now = new Date();
    const diff = now - lastContactDate;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("timer").innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateTimer, 1000);

// 2. Fungsi Reconnect (Simulasi Error + 3 Menit Tunggu)
function reconnect() {
    const btn = document.getElementById("btn-action");
    const errorLog = document.getElementById("error-log");
    
    // Tahap Simulasi Error
    btn.disabled = true;
    errorLog.innerHTML = "ERROR: SIGNAL NOT FOUND";
    btn.classList.add("btn-error", "shake");

    setTimeout(() => {
        errorLog.innerHTML = "CRITICAL FAILURE: TIMEOUT";
        setTimeout(() => {
            errorLog.style.color = "#00ff00";
            errorLog.innerHTML = "BYPASSING... ESTABLISHING CONNECTION";
            btn.classList.remove("btn-error", "shake");
            
            // Proses Tunggu 3 Menit (180000ms)
            startSearching(btn);
        }, 3000);
    }, 3000);
}

function startSearching(btn) {
    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        btn.innerHTML = "SEARCHING" + ".".repeat(dots);
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        document.getElementById("initial-text").style.display = "none";
        btn.style.display = "none";
        document.getElementById("error-log").style.display = "none";
        
        document.getElementById("secret-message").style.display = "block";
        document.getElementById("memory-gallery").style.display = "block";
        document.getElementById("bg-music").play();
        
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 5000); // 5 Detik
}