//Client API
const socket = io('/')//socket io에 접속한다.
/*Socket
A Socket is the fundamental class for interacting with the server.
*/
//const value = webgazer.begin()
//webgazer.setGazeListener(function(data, elapsedTime) {}).begin();
const H_text = document.getElementById('header_title');
const H_mode = document.getElementById('header_mode');
const divArea = document.getElementById('cheatingListSearchDiv');
//const mainElement = document.getElementsByClassName('main_position_parent');
let video_back = document.getElementsByTagName('video');
let isHost;
//const videoGrid = document.getElementById('video-grid');
/*
Document.getElementById() 메서드는 주어진 문자열과 일치하는 id(#video-grid) 속성을 가진 요소를 찾고, 
이를 나타내는 Element 객체를 반환합니다.
*/
//$('#status').hide();  
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

H_text.innerText ='지금 현재 방 아이디 : ' + ROOM_ID;
isHost = window.prompt("클라이언트이면 0 관리자면 1을 입력하세요");

var idInfo;
var index = 0;
var arr = new Array(); 
var ID_UUID;
var myVideo;
var myCanvas;
var giddiv;

if(isHost == 0 ){
  myVideo = document.createElement('video')
  myCanvas = document.createElement('canvas')
  webgazer.begin(undefined,myVideo,myCanvas)
  giddiv = document.createElement('div')
  H_mode.innerText = '당신은 클라이언트 입니다.' 
  divArea.remove();
  myVideo.muted = true
}else {
  H_mode.innerText = '당신은 관리자 입니다.';
}

const peers = {} //피어 배열들
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, myCanvas ,stream,giddiv,isHost)
  
  myPeer.on('call', call => { // 들어오는 녀석들
    //if(isHost == 0) return;
    call.answer(stream)
    const video = document.createElement('video')
    //const canvas = document.createElement('canvas')
    const div = document.createElement('div')
    //webgazer.begin(undefined,video2,canvas2)
    call.on('stream', userVideoStream => {
      if(isHost == 1) addVideoStream(video, null, userVideoStream, div,0)
    })
  })

  //이 부분이 이제 비디오가 생기는 부분인듯
  //jQuery에서 이벤트를 바인드 하는 방법은 여러가지가 있지만 이번엔 on() 함수를 이용해서 이벤트를 바인드하는 것을 알아보자. 이벤트 바인딩
  //특정 동작을 통해서 새로운 Element들이 <div class="root"> 아래로 생성
  //socket.on(eventName, callback)
//------------------------------------------------------------------------
socket.on('user-connected', userId => {
    ID_UUID = userId;
    // user is joining
    setTimeout(() => {
      // user joined
      connectToNewUser(userId, stream)
    }, 5000)
  })
  
  socket.on('user-disconnected', userId => {

    if (peers[userId]) peers[userId].close()
    var i;
    for(i=0;i<index;i++){
      if(arr[i]==userId) break;
    }
    for(var j=i;j<index-1;j++){
        array[j] = array[j+1];
    }
    //userdiv[i].remove();
    index--;

    var str='';
    if(index == 0) $('#cheatingListSearchDiv').text("현재 커닝자 없음")
    else {
      for(var i=0;i<index;i++){
        str = str+String(arr[i])
        str = str+" | "
      }  
      $('#cheatingListSearchDiv').text(str)
    }
  })

  socket.on('user-cheating', userId => {
    arr[index++] = userId 
    var str='부정행위자 : ';
    for(var i=0;i<index;i++){
        str = str+String(arr[i])
        str = str+" | "
    }  

    $('#cheatingListSearchDiv').text(str)
  })
})
//server에서 user-connected 되었으면 하는동작
//server에서 user-disconnected 되었으면 하는동작
//------------------------------------------------------------------------
myPeer.on('open', id => {
  let width, height
  if(isHost == 0){
    setTimeout(() => {
     const[ox, oy, oWidth, oHeight] = webgazer.computeValidationBoxSize()
     if(!width) width = webgazer.params.videoViewerWidth
     if(!height) height = webgazer.params.videoViewerHeight

     const randomMove = () => {
       const x = _.random(0, height - oHeight) 
       const y = _.random(0, width - oWidth)

       webgazer.computeValidationBoxSize = () => [x, y, oWidth, oHeight]
       webgazer.setVideoViewerSize(width, height, x, y)


      setTimeout(() => {
        randomMove()
      }, _.random(1000, 5000))
     }

     randomMove()
   }, 3000)
  }
  
  idInfo = id;
  ID_UUID = id;
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  if(isHost == 0) return;
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  const div = document.createElement('div')
  //const canvas = none
  //webgazer.begin(undefined,video,canvas)
  call.on('stream', userVideoStream => {
    addVideoStream(video, null ,userVideoStream, div,0)
  })
  call.on('close', () => {
    video.remove()
    div.remove()
  })
  peers[userId] = call
}

function divStyle(in_tag, y,x){
  in_tag.innerText = ID_UUID;
  console.log(x,y);
  in_tag.style.fontSize = "1rem";
  in_tag.style.position = "absolute";
  in_tag.style.left = (x-59)+"px";
  in_tag.style.top = y+"px";  
  in_tag.style.backgroundColor = 'black';
  in_tag.style.color = 'white';
  in_tag.style.border = '1px solid black'
  in_tag.style.width = '320px';
  in_tag.style.height = '20px';
}
function addVideoStream(video, canvas ,stream, div,sw) {
  if(sw == 1) return;
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
  //if(canvas != null && isHost != 1) {videoGrid.append(canvas)}
  videoGrid.append(div)
  video_back = document.getElementsByTagName('video');
  let video_last_idx = video_back.length-1;
  let videopx_y = window.pageYOffset + video_back[video_last_idx].getBoundingClientRect().top;
  let videopx_x = window.pageXOffset + video_back[video_last_idx].getBoundingClientRect().left;

  divStyle(div, videopx_y,videopx_x);
}

function cheating(){
  socket.emit('cheating',ROOM_ID, idInfo)
}

/*$('#cheatingListSearchBtn').click(function(){
  if(index>0){
    var win = window.open("", "PopupWin", "width=500,height=600");
    for(var i=0;i<index;i++){
      win.document.write(arr[i]);
      win.document.write("<br>");
    }  
  }else{
    alert("없습니다.");
  }
});*/