const express = require('express')
const app = express()
//express 프레임 워크 모듈 불러오기

const server = require('http').Server(app)
// 하이퍼미디어 문서를 전송하기위한 애플리케이션 레이어 프로토콜입니다.
// http server를 socket.io server로 upgrade한다

//---------------------------------------- 소켓 io 서버 생성
const io = require('socket.io')(server)
//socket io라는 모듈 불러오기

const { v4: uuidV4 } = require('uuid')
// 객체속 변수 v4 에다가 UUID 넣은모습
//UUID 란?
//UUID는 Universally Unique IDentifier의 약어이고 범용 고유 식별자 라고 할 수 있네요.
//75442486-0878-440c-9db1-a7006c25a39f

//----------------------------------------
app.set('view engine', 'ejs')
//Assigns setting name to value.
/*
--express 프레임 워크--
set과 get은 같이 쓰인다.
app.set('title', 'My Site')
app.get('title') // "My Site"
*/

app.use(express.static('public'))
//--express 프레임 워크--
//public 폴더 디렉토리에 포함된 파일을 로드할 수 있습니다.
//app.use([path,] callback [, callback...])
//express.static(파일이름, [options])  It serves static files and is based on serve-static.

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})
//get Returns the value of name app setting, 
//app.get('/', (req, res) specified path with the specified callback functions.에대ㅎ나 정보	Callback functions; can be:
//The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
//  res.redirect(`/${uuidV4()}`) uuid로 이루어진 주소임

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})
//Returns the rendered HTML of a view via the callback function. 


io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    //socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.broadcast.to(roomId).emit('user-connected', userId) 

    socket.on('disconnect', () => {
      //socket.to(roomId).broadcast.emit('user-disconnected', userId)
      socket.broadcast.to(roomId).emit('user-disconnected', userId) 
    })

    socket.on('cheating', () => {
      //socket.to(roomId).broadcast.emit('user-disconnected', userId)
      socket.broadcast.to(roomId).emit('user-cheating', userId) 
    })
  })
})
// 소켓과 

server.listen(3000)