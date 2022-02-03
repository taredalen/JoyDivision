
let track_index2 = 0;
let isPlaying2 = false;
let updateTimer2;

let curr_track2 = document.createElement('audio');

let track_list2 = [
  {
    name: "Atrocity Exhibition",
    path: "https://joydivision.ucoz.com/mp3/2/01Atrocity_Exhibition.mp3"
  },
  {
    name: "Isolation",
    path: "https://joydivision.ucoz.com/mp3/2/02Isolation.mp3"
  },
  {
    name: "Passover",
    path: "https://joydivision.ucoz.com/mp3/2/03Passover.mp3"
  },
  {
    name: "Colony",
    path: "https://joydivision.ucoz.com/mp3/2/04Colony.mp3"
  },
  {
    name: "A Means To An End",
    path: "https://joydivision.ucoz.com/mp3/2/05A_Means_To_An_End.mp3"
  },
  {
    name: "Heart And Soul",
    path: "https://joydivision.ucoz.com/mp3/2/06Heart_And_Soul.mp3"
  },
  {
    name: "Twenty Four Hours",
    path: "https://joydivision.ucoz.com/mp3/2/07Twenty_Four_Hours.mp3"
  },
  {
    name: "The Eternal",
    path: "https://joydivision.ucoz.com/mp3/2/08The_Eternal.mp3"
  },
  {
    name: "Decades",
    path: "https://joydivision.ucoz.com/mp3/2/09Decades.mp3"
  }
];



function loadTrackSecond(track_index2) {
  clearInterval(updateTimer2);
  resetValues();
  curr_track2.src = track_list2[track_index2].path;
  curr_track2.load();

  document.getElementById("second-track-name").innerHTML  = track_list2[track_index2].name;
  document.getElementById("second-now-playing").innerHTML = "PLAYING " + (track_index2 + 1) + " OF " + track_list2.length;

  updateTimer2 = setInterval(seekUpdateSecond, 1000);
  curr_track2.addEventListener("ended", nextTrackSecond);
}

function resetValues() {
  document.getElementById("second-current-time").innerHTML = "00:00";
  document.getElementById("second-total-duration").innerHTML = "00:00";
  document.getElementById("second-seek_slider").value = 0;
}

// Load the first track in the tracklist
loadTrackSecond(track_index2);

function playpauseTrackSecond() {
  if (!isPlaying2) playTrackSecond();
  else pauseTrackSecond();
}

function playTrackSecond() {
  curr_track2.play();
  isPlaying2 = true;
  document.getElementById("second-playpause-track").innerHTML =  "<i class='fa fa-pause-circle fa-5x'></i>";
}

function pauseTrackSecond() {
  curr_track2.pause();
  isPlaying2 = false;
  document.getElementById("second-playpause-track").innerHTML =  "<i class='fa fa-play-circle fa-5x'></i>";
}

function nextTrackSecond() {
  console.log('next');
  if (track_index2 < track_list2.length - 1)
    track_index2 += 1;
  else track_index2 = 0;
  loadTrackSecond(track_index2);
  playTrackSecond();
}

function prevTrackSecond() {
  if (track_index2 > 0)
    track_index2 -= 1;
  else track_index2 = track_list2.length;
  loadTrackSecond(track_index2);
  playTrackSecond();
}

function seekToSecond() {
  let seekToSecond = curr_track2.duration * (document.getElementById("second-seek_slider").value / 100);
  curr_track2.currentTime = seekToSecond;
}

function setVolumeSecond() {
  curr_track2.volume = document.getElementById("second-volume_slider").value / 100;
}

function seekUpdateSecond() {
  let seekPosition = 0;

  if (!isNaN(curr_track2.duration)) {
    seekPosition = curr_track2.currentTime * (100 / curr_track2.duration);

    document.getElementById("second-seek_slider").value = seekPosition;
    document.getElementById("second-seek_slider").innerHTML =  seekPosition;

    let currentMinutes = Math.floor(curr_track2.currentTime / 60);
    let currentSeconds = Math.floor(curr_track2.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track2.duration / 60);
    let durationSeconds = Math.floor(curr_track2.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    document.getElementById("second-current-time").innerHTML =  currentMinutes + ":" + currentSeconds;
    document.getElementById("second-total-duration").innerHTML =  durationMinutes + ":" + durationSeconds;
  }
}
