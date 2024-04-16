const playBtn=document.querySelector('#mainPlayBtn');
const audio=document.querySelector('#audio');
const btnPrev=document.querySelector('#btnPrev');
const btnNext=document.querySelector('#btnNext');
const trackTitle=document.querySelector('.track-title');
const artistName=document.querySelector('.artist-name');
const cover=document.querySelector('.cover');
const slider=document.querySelector('.slider');
const thumb=document.querySelector('.slider-thumb');
const progress=document.querySelector('.progress');
const time=document.querySelector('.time');
const fullTime=document.querySelector('.fulltime');
const volumeSlider=document.querySelector('.volume-slider .slider');
const volumeProgress=document.querySelector('.volume-slider .progress');
const volumeIcon=document.querySelector('.volume-icon');

let trackPlaying= false;
let volumeMuted=false;
let trackId=0;
const tracks=[
    "On My Way",
    "Wine My Body",
    "Supergirl",
    "Mayores",
    "Sorry",
    "Play Date",
    "Steal The Show"
];

const artists = [
    "Alan Walker",
    "Otilia",
    "Anastacia",
    "Bad Bunny and Becky G",
    "Justin Bieber",
    "Melanie Martinez",
    "Lauv",
    
];
const covers=[
    "cover1",
    "cover2",
    "cover3",
    "cover4",
    "cover5",
    "cover6",
    "cover7"


];

playBtn.addEventListener('click', playTrack);
function playTrack(){
    if(trackPlaying===false){
        audio.play();
        playBtn.innerHTML=` <span class="material-symbols-outlined">pause </span>`;
        trackPlaying=true;
     
    }
    else{
        audio.pause();
        playBtn.innerHTML=`<span class="material-symbols-outlined">play_arrow</span>`;
        trackPlaying=false;
    }
 }

function switchTrack(){
    if(trackPlaying===true){
        audio.play();
    }
}
const trackSrc='assets/tracks/'+ tracks[trackId]+".mp3";
function loadTrack(){
    audio.src='assets/tracks/'+ tracks[trackId]+".mp3";
    audio.load();
    trackTitle.innerHTML= tracks[trackId];
    artistName.innerHTML= artists[trackId];
    cover.src='assets/covers/'+ covers[trackId] + ".png";
    progress.style.width=0;
    thumb.style.left=0;
    audio.addEventListener('loadeddata', ()=>{
       setTime(fullTime, audio.duration);
       slider.setAttribute("max" , audio.duration);
    });

}
loadTrack();
btnPrev.addEventListener('click',()=>{
      trackId--;
      if(trackId<0){
        trackId=tracks.length - 1;
      }
      loadTrack();
      switchTrack();
    });

    btnNext.addEventListener('click',nextTrack);
    function nextTrack(){
        trackId++;
        if(trackId> trackId.length - 1){
          trackId=0;
        }
        loadTrack();
        switchTrack();
      }; 
      audio.addEventListener('ended ', nextTrack);
      
      function setTime(output, input){
        const minutes= Math.floor(input / 60);
        const seconds= Math.floor(input % 60);
        if(seconds< 10){
            output.innerHTML=minutes + ":0" +seconds;

        } else{
            output.innerHTML=minutes + ":" + seconds;
        }
   }
   setTime(fullTime , audio.duration);
    audio.addEventListener('timeupdate', ()=>{
      const currentAudioTime= Math.floor(audio.currentTime);
       const timePercentage=(currentAudioTime / audio.duration) * 100 + "%";
        setTime(time, currentAudioTime);
        progress.style.width=timePercentage;
        thumb.style.left=timePercentage;
   });
   function customSlider(){
    const val=(slider.value/audio.duration) * 100 + "%";
    progress.style.width=val;
    thumb.style.left=val;
    setTime(time, slider.value);
    audio.currentTime=slider.value;

   }
   customSlider();
   slider.addEventListener("input", customSlider);
 let val;
 function customVolumeSlider(){
    const maxVal= volumeSlider.getAttribute("max");
    val=(volumeSlider.value / maxVal)* 100 + "%";
    volumeProgress.style.width=val;
    audio.volume=volumeSlider.value/100;
    if(audio.volume>0.5){
        volumeIcon.innerHTML=`<span class="material-symbols-outlined"> volume_up</span>`;

    } else if(audio.volume===0){
        volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_off</span>`;

    } else{
        volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_down</span>`;
    }
 }
 customVolumeSlider();
 volumeSlider.addEventListener("input", customVolumeSlider);
 volumeIcon.addEventListener('click', ()=>{
       if(volumeMuted===false){
        volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_off</span>`;
         audio.volume=0;
         volumeProgress.style.width=0;
         volumeMuted=true;
       } else{
        volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_down</span>`;
        audio.volume=0.5;
        volumeProgress.style.width=val;
        volumeMuted=false;
       }

 
 });