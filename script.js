// --- THE ULTIMATE MODERN YEARNING OPM & IV OF SPADES PLAYLIST ---
const opmSongs = [
    // === IV OF SPADES / ZILD ===
    'grWM7Ko7lvQ', // IV Of Spades - Mundo
    'Q63gdlxqOdw', // IV Of Spades - Come Inside Of My Heart
    'P7tMFlzJUMI', // IV Of Spades - Dulo Ng Hangganan
    'K0pUf2rREyU', // IV Of Spades - In My Prison
    '3f3V_Z0Q26I', // IV Of Spades - Hey Barbara
    '7ixfBv67I8M', // Zild - Isang Anghel (Fixed ID)

    // === MAKI (THE KING OF MODERN YEARNING) ===
    'KZwh-mJuXTg', // Maki - kahel na langit
    'n83pv5h2F4s', // Maki - Dilaw
    '_E2S0eKz09E', // Maki - Saan?
    '87mshL9F2kw', // Maki - Namamasko (Fixed ID)

    // === CUP OF JOE & DIONELA ===
    'CcS1fsuT10M', // Cup of Joe - Multo
    'NotTCIoS3gI', // Cup of Joe - Pahina
    '46o6F1_f2oI', // Cup of Joe & Janine Teñoso - Tingin
    'g_TxocS8i5Y', // Dionela ft. Jay R - Sining
    'xatV3u_Fw8Q', // Dionela - Musika

    // === ARTHUR NERY & ADIE ===
    'hVsh-j3mI3Y', // Arthur Nery - Pagsamo
    'X-r1Z2s944w', // Arthur Nery - Isa Lang
    'sZ9mZ8E9Hk8', // Arthur Nery - Higa
    'Z2eS9G6-8K8', // Adie - Paraluman
    '_n21S_Dqj50', // Adie & Janine Berdin - Mahika
    'O_9AWhuV_5E', // Adie - Tahanan

    // === OVER OCTOBER & TJ MONTERDE ===
    'er4TW1nGlR0', // Over October - Ikot
    'Z98y_n7Z_6g', // Over October - Never Enough
    'rIfJYRKdHGo', // TJ Monterde - Palagi

    // === HEAVY HITTERS: JUAN KARLOS, ZACK, DILAW, LOLA AMOUR ===
    '7v2a7ZzO_74', // Juan Karlos - Ere
    'J_V_tXvPzXw', // Zack Tabudlo - Pano
    'm1W4w8jYfkw', // Dilaw - Uhaw (Tayong Lahat)
    '5M_D8GgN4mY', // Lola Amour - Raining In Manila
    'JvSg1H9m7g4', // Lola Amour - Fallen
    'hS6mS8E6_iI', // Toneejay - 711

    // === INDIE / UNDERGROUND YEARNING ===
    'UwwQS7DbFSk', // fitterkarma - Pag-ibig ay Kanibalismo II
    'I1-q3Bv8D5w', // Rob Deniel - Miss Miss
    'E3Oon-y9-O8'  // Rob Deniel - RomCom
];

let player;
let isPlayerReady = false;
let currentTrackIndex = -1; // Keeps track of what is actively playing

const statusText = document.getElementById('status-text');
const songTitleText = document.getElementById('song-title');

// Dynamically load the YouTube API script
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Initialize the hidden player once API is ready
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
        height: '50',
        width: '50',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1
        },
        events: {
            'onReady': () => { 
                isPlayerReady = true; 
                statusText.innerText = "Ready! Click Sharmaine!";
            },
            'onError': (event) => {
                console.error("YouTube Error Code:", event.data);
                playRandomSong(); // Skip broken/blocked videos automatically
            },
            'onStateChange': (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                    statusText.innerText = "Now Playing";
                    
                    // Fetch and display the live YouTube video title
                    const videoData = player.getVideoData();
                    if (videoData && videoData.title) {
                        songTitleText.innerText = videoData.title;
                        songTitleText.style.opacity = "1";
                    }
                } else if (event.data === YT.PlayerState.BUFFERING) {
                    statusText.innerText = "Loading song...";
                    songTitleText.style.opacity = "0.5"; 
                }
            }
        }
    });
};

// Logic to pick a random ID from the array and play it without back-to-back repeats
function playRandomSong() {
    if (!isPlayerReady) {
        alert("YouTube is still loading or being blocked by your browser. Make sure your ad-blocker isn't interfering.");
        return;
    }
    
    let randomIndex;
    
    // Forces the code to keep picking a random index until it gets one that ISN'T playing right now
    do {
        randomIndex = Math.floor(Math.random() * opmSongs.length);
    } while (randomIndex === currentTrackIndex);
    
    // Update our tracker to the newly selected song
    currentTrackIndex = randomIndex;
    
    player.loadVideoById({
        'videoId': opmSongs[randomIndex],
        'startSeconds': 0
    });
}

// Attach click event to the image
const orangeBtn = document.getElementById('orange-btn');
orangeBtn.addEventListener('click', () => {
    playRandomSong();
});