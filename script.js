console.log("Welcome to spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterplay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongname = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));
const currentTimeDisplay = document.getElementById("currentTimeDisplay");

let songs = [
  {
    songName: "Kde Kde",
    filepath: "songs/1.mp3",
    coverpath: "covers/1.jpg",
  },
  {
    songName: "Heer",
    filepath: "songs/2.mp3",
    coverpath: "covers/2.jpg",
  },
  {
    songName: "Hua Main",
    filepath: "songs/3.mp3",
    coverpath: "covers/3.jpg",
  },
  {
    songName: "C.R.E.A.M Posse",
    filepath: "songs/4.mp3",
    coverpath: "covers/4.jpg",
  },
  {
    songName: "Gora Gora Rang",
    filepath: "songs/5.mp3",
    coverpath: "covers/5.jpg",
  },
  {
    songName: "Salam-e-Ishq",
    filepath: "songs/6.mp3",
    coverpath: "covers/6.jpg",
  },
  {
    songName: "Salam-e-Ishq",
    filepath: "songs/7.mp3",
    coverpath: "covers/7.jpg",
  },
  {
    songName: "Salam-e-Ishq",
    filepath: "songs/8.mp3",
    coverpath: "covers/8.jpg",
  },
  {
    songName: "Salam-e-Ishq",
    filepath: "songs/9.mp3",
    coverpath: "covers/9.jpg",
  },
  {
    songName: "Salam-e-Ishq",
    filepath: "songs/10.mp3",
    coverpath: "covers/10.jpg",
  },
];

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

songItems.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

songItems.forEach((element, i) => {
    const audio = new Audio(songs[i].filepath);
    audio.addEventListener('loadedmetadata', () => {
        const duration = formatTime(audio.duration);
        element.querySelector(".duration").innerText = duration;
    });
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // Play the song
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    // Pause the song
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});


audioElement.addEventListener("timeupdate", () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    const current = formatTime(audioElement.currentTime);
    const total = isNaN(audioElement.duration) ? "00:00" : formatTime(audioElement.duration);

    currentTimeDisplay.innerText = `${current} / ${total}`;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
    element.addEventListener('click', (e)=> {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
    })


    //for next functionality 
   
    document.getElementById('next').addEventListener('click', () => {
        if(songIndex>=0){
            songIndex = 0;
        }
        else{
            songIndex = songIndex+1 ;
        }

        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })

    //for previous functionality

    document.getElementById('previous').addEventListener('click', () => {
        if(songIndex<=0){
            songIndex = 0;
        }
        else{
            songIndex = songIndex+1 ;
        }

        audioElement.src = `songs/${songIndex-1}.mp3`;
        masterSongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })