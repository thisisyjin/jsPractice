// reference : www.zerocho.com
// JS Array / Math객체 / String / Loop practice용




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

// input과 button
const input = document.querySelector('#input-form input');
const button = document.querySelector('#input-form button');

// 


function getNumber() {
    let list = [0,1,2,3,4,5,6,7,8,9];
    let answer = [];
    for (let i=0; i<4; i++) {
        let select = Math.floor(Math.random() * list.length);
        // answer[i] = list.splice(select, 1)[0];
        answer.push(list.splice(select, 1)[0]);
    }
    localStorage.setItem('answer', answer.join(''));   // answer = 2458
}

let count = 1;

function guessNumber() {
    let strike = 0;
    let ball = 0;

    while(count <= 10) {
    let num = input.value;
    let numArr = num.split('');
    strike = 0;
    ball = 0;

    let answerArr = localStorage.getItem('answer').split('');

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
        logMessage('정답입니다!' + count + '회만에 맞춤', '#370089');
        break;
    } else if (count > 10) {
        logMessage('시도 횟수를 초과하셨습니다.\n게임을 다시 하려면 F5를 누르세요.', '#780000');
    } else {
        logMessage(numArr.join('') + ': ' + strike + '스트라이크 ' + ball + '볼');
        count++;
        break;
     }
  }

}


getNumber();       // 숫자 뽑기
button.addEventListener('click', guessNumber);     // eventListener - 버튼 클릭시 





