
let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Disorder",
    path: "https://joydivision.ucoz.com/mp3/1/01Disorder.mp3"
  },
  {
    name: "Day Of The Lords",
    path: "https://joydivision.ucoz.com/mp3/1/02Day_Of_The_Lords.mp3"
  },
  {
    name: "Candidate",
    path: "https://joydivision.ucoz.com/mp3/1/03Candidate.mp3"
  },
  {
    name: "Insight",
    path: "https://joydivision.ucoz.com/mp3/1/04Insight.mp3"
  },
  {
    name: "New Dawn Fades",
    path: "https://joydivision.ucoz.com/mp3/1/05New_Dawn_Fades.mp3"
  },
  {
    name: "She's Lost Control",
    path: "https://joydivision.ucoz.com/mp3/1/06She-s_Lost_Control.mp3"
  },
  {
    name: "Shadowplay",
    path: "https://joydivision.ucoz.com/mp3/1/07Shadowplay.mp3"
  },
  {
    name: "Wilderness",
    path: "https://joydivision.ucoz.com/mp3/1/08Wilderness.mp3"
  },
  {
    name: "Interzone",
    path: "https://joydivision.ucoz.com/mp3/1/09Interzone.mp3"
  },
  {
    name: "I Remember Nothing",
    path: "https://joydivision.ucoz.com/mp3/1/10I_Remember_Nothing.mp3"
  }
];



function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  document.getElementById("track-name").innerHTML  = track_list[track_index].name;
  document.getElementById("now-playing").innerHTML = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  document.querySelector(".current-time").textContent = "00:00";
  document.querySelector(".total-duration").textContent = "00:00";
  document.getElementById("seek_slider").value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  document.getElementById("playpause-track").innerHTML =  "<i class='fa fa-pause-circle fa-5x'></i>";
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  document.getElementById("playpause-track").innerHTML =  "<i class='fa fa-play-circle fa-5x'></i>";
}

function nextTrack() {
  console.log('next');
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (document.getElementById("seek_slider").value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = document.getElementById("volume_slider").value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    document.getElementById("seek_slider").value = seekPosition;
    document.getElementById("seek_slider").innerHTML =  seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    document.getElementById("current-time").innerHTML =  currentMinutes + ":" + currentSeconds;
    document.getElementById("total-duration").innerHTML =  durationMinutes + ":" + durationSeconds;
  }
}
