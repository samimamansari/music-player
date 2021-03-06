const image  = document.querySelector("img");
const title  = document.getElementById("title");
const artist  = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const song = [
    {
        name:"jacinto-1",
        displayname : "Electric Chill Machine",
        artist: "Jacinto Design"
    },
    {
        name:"jacinto-2",
        displayname : "Seven Nation Army (Remix)",
        artist: "Mark Henry"
    },
    {
        name:"jacinto-3",
        displayname : "Kite Ben",
        artist: "Rose Lilly"
    },
    {
        name:"metric-1",
        displayname : "Front Row (Remix)",
        artist: "Metric/Jacinto Design"
    }
];
let isPlaying = false;

// play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("title","Pause");
    music.play();
}

// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title","Play");
    music.pause();
}

// play and pause event listener
playBtn.addEventListener("click",()=>{
    isPlaying ? pauseSong() : playSong();
});

// update dom
function loadSong(currentSong){ 
    title.textContent = currentSong.displayname;
    artist.textContent = currentSong.artist;
    music.src = `music/${currentSong.name}.mp3`;
    image.src = `img/${currentSong.name}.jpg`;
}

// Cuurrent Song
let songIndex = 0 ;

// Prev
function prevSong(){
    songIndex--;
    if(songIndex < 0)
    {
        songIndex = song.length - 1;
    }
    loadSong(song[songIndex]);
    playSong();
}

// Next
function nextSong(){
    songIndex++;
    if(songIndex > song.length - 1)
    {
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    playSong();
}

// On Load -select first song
loadSong(song[songIndex]);

//Update progress bar and time
function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display duration
        const durationMinutes = Math.floor( duration/60);
         let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10)
        {
            durationSeconds = `0${durationSeconds}`;
        }
         // Delay switching during elment to avoid Nan
        if(durationSeconds)
        {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor( currentTime/60);
         let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10)
        {
            currentSeconds = `0${currentSeconds}`;
        }
         // Delay switching during elment to avoid Nan
        if(currentSeconds)
        {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
} 

// Set ProgressBar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);
music.addEventListener("timeupdate",updateProgressBar);
music.addEventListener("ended",nextSong);
progressContainer.addEventListener("click",setProgressBar);

