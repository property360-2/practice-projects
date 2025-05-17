const playlistEl = document.getElementById("playlist-songs");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const songTitleEl = document.getElementById("player-song-title");
const songArtistEl = document.getElementById("player-song-artist");

const audio = new Audio();

const songs = [
    { id: 0, title: "Hello World", artist: "Rafael", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/hello-world.mp3" },
    { id: 1, title: "In the Zone", artist: "Rafael", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/in-the-zone.mp3" },
    { id: 2, title: "Camper Cat", artist: "Rafael", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/camper-cat.mp3" },
    { id: 3, title: "Electronic", artist: "Rafael", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/electronic.mp3" },
    { id: 4, title: "Sailing Away", artist: "Rafael", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/sailing-away.mp3" }
];

let currentSong = null;

// Render playlist using createElement and append
const renderPlaylist = () => {
    playlistEl.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        li.classList.add('playlist-song');
        li.setAttribute('data-id', song.id);

        const titleSpan = document.createElement('span');
        titleSpan.textContent = song.title;

        const artistSpan = document.createElement('span');
        artistSpan.textContent = song.artist;

        li.append(titleSpan, artistSpan);
        playlistEl.appendChild(li);
    });
};

const updateDisplay = (song) => {
    songTitleEl.textContent = song?.title || '';
    songArtistEl.textContent = song?.artist || '';
    document.querySelectorAll('.playlist-song').forEach(el => el.removeAttribute('aria-current'));
    if (song) {
        const el = document.querySelector(`.playlist-song[data-id="${song.id}"]`);
        el?.setAttribute('aria-current', 'true');
    }
};

const playSong = (id) => {
    const song = songs.find(s => s.id === id);
    if (!song) return;
    audio.src = song.src;
    audio.play();
    currentSong = song;
    updateDisplay(song);
};

playlistEl.addEventListener('click', (e) => {
    const songEl = e.target.closest('.playlist-song');
    if (!songEl) return;
    const id = Number(songEl.getAttribute('data-id'));
    playSong(id);
});

playBtn.addEventListener('click', () => {
    if (currentSong) {
        audio.play();
    } else {
        playSong(0);
    }
});

pauseBtn.addEventListener('click', () => audio.pause());

nextBtn.addEventListener('click', () => {
    if (!currentSong) return playSong(0);
    const index = songs.findIndex(s => s.id === currentSong.id);
    const nextSong = songs[index + 1] || songs[0];
    playSong(nextSong.id);
});

prevBtn.addEventListener('click', () => {
    if (!currentSong) return;
    const index = songs.findIndex(s => s.id === currentSong.id);
    const prevSong = songs[index - 1] || songs[songs.length - 1];
    playSong(prevSong.id);
});

audio.addEventListener('ended', () => nextBtn.click());
audio.addEventListener('error', () => alert("Failed to load audio."));

renderPlaylist();
