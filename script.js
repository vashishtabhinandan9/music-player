console.log("rock this party");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('assets/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('songname');
let songItems = Array.from(document.getElementsByClassName('songitem'));


let songs= [
    {songName: "Beat 1", filePath: "assets/songs/1.mp3", coverPath: "assets/covers/1.jpg"},
    {songName: "Beat 2", filePath: "assets/songs/2.mp3", coverPath: "assets/covers/2.jpg"},
    {songName: "Beat 3", filePath: "assets/songs/3.mp3", coverPath: "assets/covers/3.jpg"},
    {songName: "Beat 4", filePath: "assets/songs/4.mp3", coverPath: "assets/covers/4.jpg"},
    {songName: "Beat 5", filePath: "assets/songs/5.mp3", coverPath: "assets/covers/5.jpg"},
    {songName: "Beat 6", filePath: "assets/songs/6.mp3", coverPath: "assets/covers/6.jpg"},
    {songName: "Beat 7", filePath: "assets/songs/7.mp3", coverPath: "assets/covers/7.jpg"},
    {songName: "Beat 8", filePath: "assets/songs/8.mp3", coverPath: "assets/covers/8.jpg"},
    {songName: "Beat 9", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpg"},
];

//sets the name  and other details of the songs on the screen by iteratng th above array
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByTagName("h4")[0].innerText = songs[i].songName; 
})

// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        //change the play button to pause button
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause-circle');
        //change the opacity of the gi
        gif.style.opacity =1;
        }

    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})
//handles the progress bar when you change it 
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('indivisualPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('indivisualPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(audioElement.paused || audioElement.currentTime<=0){
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `assets/songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause-circle');
    }

    else{
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play');
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play');
        gif.style.opacity = 0;
    }
    
})
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause-circle');

})
       

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause-circle');
})
