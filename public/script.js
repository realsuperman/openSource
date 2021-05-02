//Client API

const socket = io('/')//socket io에 접속한다.
/*Socket
A Socket is the fundamental class for interacting with the server.
*/
const videoGrid = document.getElementById('video-grid')
/*
Document.getElementById() 메서드는 주어진 문자열과 일치하는 id(#video-grid) 속성을 가진 요소를 찾고, 
이를 나타내는 Element 객체를 반환합니다.
*/

const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

const myVideo = document.createElement('video')
/*
.createElement()는 요소를 만듭니다. 예를 들어
.createElement( 'h1' )
*/

myVideo.muted = true
const peers = {} //피어 배열들

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)
  //미디어 입력 장치 사용 권한을 요청하며,

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })
  //이 부분이 이제 비디오가 생기는 부분인듯
  //jQuery에서 이벤트를 바인드 하는 방법은 여러가지가 있지만 이번엔 on() 함수를 이용해서 이벤트를 바인드하는 것을 알아보자. 이벤트 바인딩
  //특정 동작을 통해서 새로운 Element들이 <div class="root"> 아래로 생성
  //socket.on(eventName, callback)

//------------------------------------------------------------------------
socket.on('user-connected', userId => {
    // user is joining
    setTimeout(() => {
      // user joined
      connectToNewUser(userId, stream)
    }, 3000)
  })
})
//server에서 user-connected 되었으면 하는동작

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})
//server에서 user-disconnected 되었으면 하는동작
//------------------------------------------------------------------------

myPeer.on('open', id => {
  window._webgazer = webgazer.setGazeListener(function(data, elapsedTime) {
    
  }).begin();

  setTimeout(() => {
    window._webgazer.tracker.TFFaceMesh()
    window._webgazer.tracker.model.then(model => {
      console.debug(model.pipeline)
    })
  }, 5000)

  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}