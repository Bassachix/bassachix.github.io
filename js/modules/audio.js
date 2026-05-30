export function initAudio() {
    const audioToggle = document.getElementById('audio-toggle');
    const bgAudio = document.getElementById('bg-audio');
    const canvas = document.getElementById('audio-visualizer');

    if (!audioToggle || !bgAudio) return;

    let isPlaying = false;
    let audioCtx = null;
    let analyser = null;
    let dataArray = null;
    let canvasCtx = null;
    let animFrameId = null;
    
    if (canvas) {
        canvasCtx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = 120;
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
        });
    }

    bgAudio.volume = 0.3;

    function initWebAudio() {
        if (audioCtx) return;
        
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            const source = audioCtx.createMediaElementSource(bgAudio);
            
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            
            analyser.fftSize = 128;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        } catch (e) {
            console.warn("Web Audio API not supported or CORS blocked it.", e);
        }
    }

    function startVisualizer() {
        if (animFrameId) return;
        drawVisualizer();
    }

    function stopVisualizer() {
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        // Clear canvas
        if (canvasCtx && canvas) {
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    function drawVisualizer() {
        if (!canvasCtx || !analyser || !isPlaying) {
            animFrameId = null;
            return;
        }
        
        animFrameId = requestAnimationFrame(drawVisualizer);
        
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / dataArray.length) * 1.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i] / 2;
            
            const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, canvas.height - (barHeight || 1));
            gradient.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 0, 85, 0.8)');
            
            canvasCtx.fillStyle = gradient;
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
            
            x += barWidth;
        }
    }

    const toggleAudio = () => {
        initWebAudio();
        
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        // Toggle state first so drawVisualizer reads the correct value
        isPlaying = !isPlaying;

        if (!isPlaying) {
            bgAudio.pause();
            audioToggle.classList.remove('playing');
            audioToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
            stopVisualizer();
        } else {
            audioToggle.classList.add('playing');
            audioToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
            bgAudio.play().catch(err => {
                console.error("Audio file is missing or playback blocked: ", err);
            });
            startVisualizer();
        }
    };

    audioToggle.addEventListener('click', toggleAudio);
}
