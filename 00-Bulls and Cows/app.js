// reference : www.zerocho.com
// JS Array / Math객체 / String / Loop practice용


const form = document.getElementById('input-form');
const input = document.querySelector('#input-form input');
const button = document.querySelector('#input-form button');
const limitDiv = document.getElementById('log2');
const limitNum = document.getElementById('limit');
limitNum.innerHTML = 10;

let answer = [];
let count = 0;


// 로그 출력
function logMessage(msg, color) {
    if(!color) {color = '#444444';}
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.style.color = color;
    if(color === '#370089') {div.style.fontWeight = 'bold';
        div.style.fontSize = '20px';}
    document.getElementById('log').appendChild(div);
}


function getNumber() {
    let list = [0,1,2,3,4,5,6,7,8,9];
    for (let i=0; i<4; i++) {
        let select = Math.floor(Math.random() * list.length);
        // answer[i] = list.splice(select, 1)[0];
        answer.push(list.splice(select, 1)[0]);
    }
    console.log(answer);
}


function guessNumber(event) {
    event.preventDefault;
    
    let strike = 0;
    let ball = 0;
    
    while(count < 10) {        
    let num = input.value;
    let numArr = num.split('');
    strike = 0;
    ball = 0;

    let answerArr = String(answer).split(',');
    count++;
 
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
    input.value = '';

    if (strike === 4) {
        logMessage('HomeRun! ㅡ ' + count + '회만에 맞춤', '#370089');
        limitDiv.style.display = 'none';
        break;
    } else if (count >= 10) {
        logMessage(`GameOver : 시도 횟수 초과 ㅡ 새 게임 : F5`, '#780000');
        limitDiv.style.display = 'none';
    } else {
        logMessage(numArr.join('') + ': ' + strike + '스트라이크 ' + ball + '볼');
        limitNum.innerHTML = 10 - count;
        break;
     }
  }

}


getNumber();       // 숫자 뽑기
form.addEventListener('submit', guessNumber);    // eventListener - 폼 제출시

// button.addEventListener('click', guessNumber);     // eventListener - 버튼 클릭시 





