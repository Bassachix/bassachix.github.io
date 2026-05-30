export const translations = {
    "id": {
        "meta-desc": "Khairul Fahmi — Creative Hub. Tempat penghubung seluruh kreasi dan project digital saya.",
        "og-desc": "Tempat penghubung seluruh kreasi dan project digital saya.",
        "hero-desc": "Selamat datang di hub kreasi saya. Di sini Anda bisa menemukan seluruh karya digital yang telah saya buat — dari web apps hingga project eksperimental. Semua terhubung di satu tempat.",
        "creations-subtitle": "Setiap karya adalah perjalanan. Klik untuk menjelajahi.",
        "simbada-desc": "Sistem Informasi berbasis web untuk manajemen data dan proses pengambilan keputusan (SPK).",
        "creative-hub-desc": "Website personal hub dengan desain modern dark-theme, glassmorphism, dan smooth animations.",
        "next-project-title": "Project Selanjutnya",
        "next-project-desc": "Kreasi baru sedang dalam pengembangan. Stay tuned untuk update terbaru.",
        "saweria-desc": "Dukung kreasi saya dengan mentraktir kopi. Setiap dukungan sangat berarti! ☕",
        "github-desc": "Lihat semua repository, kontribusi open-source, dan kode saya di GitHub.",
        "gallery-subtitle": "Koleksi gambar, ilustrasi, atau momen favorit yang saya abadikan.",
        "about-bio": "Saya seorang kreator digital yang suka membangun hal-hal menarik di web. Hub ini adalah tempat di mana semua kreasi saya terhubung — mulai dari web apps, website, hingga eksperimen digital lainnya. Jika Anda tertarik berkolaborasi atau sekadar ngobrol, jangan ragu untuk menghubungi saya.",
        "contact-subtitle": "Punya ide kolaborasi, pertanyaan, atau hanya ingin say hi? Hubungi saya lewat channel di bawah ini."
    }
};

export function initI18n() {
    function applyIndonesian() {
        document.documentElement.lang = 'id';
        
        // Translate texts
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations['id'][key]) {
                el.textContent = translations['id'][key];
            }
        });

        // Translate meta tags
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', translations['id']['meta-desc']);
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', translations['id']['og-desc']);
        
        console.log("Language switched to Indonesian (id)");
    }

    try {
        let isIndonesia = false;
        console.log("[i18n] Starting language detection...");
        
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        console.log("[i18n] Detected Timezone:", timeZone);
        
        const offset = new Date().getTimezoneOffset();
        console.log("[i18n] Detected Timezone Offset:", offset);
        
        console.log("[i18n] Detected Browser Language:", navigator.language);

        // 1. Check using timezone name
        const indoTimeZones = ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura', 'Asia/Pontianak', 'Asia/Ujung_Pandang', 'Asia/Banjarmasin', 'Asia/Bangkok'];
        if (indoTimeZones.includes(timeZone)) {
            console.log("[i18n] Matched Indonesian/UTC+7 timezone name");
            isIndonesia = true;
        }

        // 2. Check using browser language
        if (!isIndonesia && navigator.language) {
            if (navigator.language.toLowerCase().startsWith('id')) {
                console.log("[i18n] Matched Indonesian browser language");
                isIndonesia = true;
            }
        }
        
        // 3. Apply translation if detected
        if (isIndonesia) {
            applyIndonesian();
        } else {
            console.log("[i18n] Local checks failed. Requesting IP Geolocation...");
            // 4. Fallback to IP geolocation
            fetch('https://api.country.is')
                .then(res => res.json())
                .then(data => {
                    console.log("[i18n] IP Geolocation Country:", data.country);
                    if (data.country === 'ID') {
                        applyIndonesian();
                    } else if (data.country === undefined || data.error) {
                         // API might be blocked or failed silently
                         if (offset === -420 || offset === -480 || offset === -540) {
                             console.log("[i18n] Applying offset fallback due to API error");
                             applyIndonesian();
                         }
                    }
                })
                .catch(e => {
                    console.warn("[i18n] IP Geolocation fetch failed:", e);
                    // Final fallback using Timezone Offset (UTC+7, +8, +9)
                    if (offset === -420 || offset === -480 || offset === -540) {
                        console.log("[i18n] Applying offset fallback after fetch catch");
                        applyIndonesian();
                    }
                });
        }
    } catch (e) {
        console.error("Error in i18n initialization:", e);
    }
}
