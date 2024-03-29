## 눈의 위치 추적을 통한 부정행위 탐지 시스템
COVID19 전염병 확산에 따라 개인의 역량을 확인하는 시험뿐만 아니라 면접 코딩 컨테스트 등 온라인 테스트 도중 별도의 감독과 관리가 쉽지
않은 상황을 악용해 부정행위를 저지르는 사례가 발생하고 있다. 이러한 부정행위들은 시험의 공정성을 훼손 시키는 행위이다 따라서 부정행위를
효율적으로 방지하기 위한 프로젝트를 제안하고자 한다.

## 기술스택
node.js, webgazer.js

## 제안 시스템
제안 시스템은 수험자 모드와 감독관 모드가 존재한다. 수험자 모드로 사용되는 경우 수험자의 모니터에는 카메라로 촬영되는 전체 영역과 부정행
위 여부 판단을 위한 사각형 영역이 생기게 된다. 수험자는 시험을 보는 동안 사각형 영역에 얼굴을 위치시켜야 하며, 만일 수험자가 부정행위를 위해
다른 곳을 응시하여 눈이 사각형 영역을 일정 시간 벗어나는 경우 관리자에게 부정행위 탐지 알림이 보내진다.

## 고마운 사람
1. HongSangJoon(https://github.com/DogGuyMan) : 논문에 대한 많은 작업을 해준 학우이다 논문을 잘 쓰려면 기존에 쓰여진 논문에 대한 이해가 필요하다. 해당 학우는 여러 영어논문 및 한국논문을 참고
하여 프로젝트의 완성도를 높여주었다
2. SHIN WOONG KIM(https://github.com/ALFEE19971029) : 전기공학과에서 전과를 하신 학우분이다. 프로그램의 응용도가 뛰어나신 것 같았다. 우선 논문 작업도 물론 많이 해주셨고 프로그램에서는 가장
핵심이라고 할 수 있는 부정행위를 판단하기 위한 사각형 영역의 랜덤 배치를 구현하셨다
3. iksuplorer(https://github.com/iksuplorer) : 사실 가장 고마운 분이다. 바로 교수님이시다. 교수님이 없었으면 논문 작업물은 쓰레기통으로 직진했을 것이다. 또한 프로젝트에 대한 조언을 해주셨다.
정말 핵심적인 조언이였고, 이 조언이 프로젝트의 퀄리티를 훨씬 높였다고 생각을 한다. 

## 시연동영상
https://youtu.be/nPA3oDT_WzU

## 참고
KKITS의 2021년 5월호에 개제된 논문지이다. 자세한 논문에 대한 내용은 아래와 같다.
https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002769665
