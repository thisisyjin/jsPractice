// reference : www.zerocho.com
// JS Array / Math객체 / String / Loop practice용


// new ver ㅡ 1) 객체 메서드 이용


// const form = document.querySelector('#input-form');
const input = document.querySelector('#input-form input');
const button = document.querySelector('#input-form button');
const limitNum = document.getElementById('limit');

let answer = [];

limitNum.innerHTML = 10;



// 로그 출력 ㅡ 일반 함수
function logMessage(msg, color) {
    if(!color) {color = '#444444';}
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.style.color = color;
    if(color === '#370089') {div.style.fontWeight = 'bold';
        div.style.fontSize = '20px';}
    document.getElementById('log').appendChild(div);
}


// 객체 ㅡ count / getNumber / guessNumber
const play = {
    count: 0,

    getNumber: function getNumber() {
        let list = [0,1,2,3,4,5,6,7,8,9];
        for (let i=0; i<4; i++) {
            let select = Math.floor(Math.random() * list.length);
            answer.push(list.splice(select, 1)[0]);
        }
        console.log(answer);
    },

    guessNumber: function guessNumber() {
        let strike = 0;
        let ball = 0;
    
        while(play.count <= 10) {
        let num = input.value;
        let numArr = num.split('');

        strike = 0;
        ball = 0;
    
        let answerArr = String(answer).split(',');
        play.count++;    
        for(let j=0; j<4; j++) {
            for (let k=0; k<4; k++) {
                if (answerArr[j] == numArr[k]) {
                    if (j == k) {
                    strike++;
                    } else {
                    ball++;
                    }
                    break;
                }
            }
        }
    
        if (strike === 4) {
            logMessage('정답입니다!' + play.count + '회만에 맞춤', '#370089');
            document.getElementById('log2').style.display = 'none'; 
            break;
        } else if (play.count > 10) {
            logMessage('시도 횟수를 초과하셨습니다.\n게임을 다시 하려면 F5를 누르세요.', '#780000');
            document.getElementById('log2').style.display = 'none';
        } else {
            logMessage(numArr.join('') + ': ' + strike + '스트라이크 ' + ball + '볼');
            limitNum.innerHTML = 10 - play.count;
            break;
         }
      }
    
    }
}

play.getNumber();       // 숫자 뽑기
// form.addEventListener('submit', play.guessNumber);     // eventListener - 폼 제출시
button.addEventListener('click', play.guessNumber);     // eventListener - 버튼 클릭시 




