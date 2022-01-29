// 메세지를 #log에 추가

function logMessage(msg, color) {        
    if(!color) {color = '#2f2f2f';}
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.style.color = color;
    document.getElementById('log').appendChild(div);
}


// 캐릭터 생성자

let gameover = false;
let battle = false;

function Character(name, hp, att) {
    this.name = name;
    this.hp = hp;
    this.att = att;
}


// 메서드 ㅡ attacked / attack

Character.prototype.attacked = function(damage) {
    this.hp -= damage;
    logMessage(this.name + ' 의 체력이 ' + this.hp + ' 가 되었습니다.');
    if(this.hp <= 0) {
        battle = false;
    }  else {
        logMessage(this.name + ' 님의 체력이 ' + this.hp + ' 남았습니다.');
    }
};

Character.prototype.attack = function(target) {
    logMessage(this.name + '이 ' + target.name + ' 을 공격합니다.');
    target.attacked(this.att);
};



// 영웅 생성자 ㅡ Character 상속

function Hero(name, hp, att, lev, xp) {
    Character.apply(this, arguments);
    this.lev = lev || 1;    //(lev = 1)
    this.xp = xp || 0;      //(xp = xp)
}

Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;



// 메서드 ㅡ attacked / attack / gainXp(경험치)

Hero.prototype.attacked = function(damage) {
    this.hp -= damage;
    if(this.hp <= 0){
        logMessage('죽었습니다. 레벨 ' + this.lev + '에서 모험이 끝납니다.  F5를 눌러 리스폰하세요.', 'red');
        battle = false;
        gameover = true;
    } else {
        logMessage(this.name + ' 님의 체력이 ' + this.hp + ' 남았습니다.');
    }
};

Hero.prototype.attack = function(target) {
    logMessage(this.name + ' 님이 ' + target.name + '을 공격합니다.');
    target.attacked(this.att);
    if(target.hp <= 0) {
        this.gainXp(target);
    }
};


Hero.prototype.gainXp = function(target) {
    logMessage('🏆 전투에서 승리하여 ' + target.xp + '의 경험치를 얻습니다.', 'blue');
    this.xp += target.xp;
    if(this.xp > 100 + 10 * this.lev) {
        this.lev++;
        logMessage('🔺 레벨 업! ' + this.lev + '레벨이 되었습니다.', 'blue');
        this.hp = 100 + this.lev * 10;
        this.xp -= 10 * this.lev + 100;          
    }
};


// 몬스터 생성자 ㅡ Character 상속

function Monster(name, hp, att, lev, xp) {
    Character.apply(this, arguments);
    this.lev = lev || 1;
    this.xp = xp || 10;
}

Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;


// 몬스터 랜덤으로 만드는 함수

function makeMonster() {
    const monsterArr = [
        ['rabbit', 25, 3, 1, 35],
        ['skeleton', 50, 6, 2, 50],
        ['soldier', 80, 4, 3, 75],
        ['king', 120, 9, 4, 110],
        ['devil', 500, 12, 6, 250]
    ];
    const monster = monsterArr[Math.floor(Math.random() * 5)];
    return new Monster(monster[0], monster[1], monster[2], monster[3], monster[4]);
}




///// 게임 진행 ㅡ ( 전투 > 승리 > 경험치업 > 전투 > 승리 > 레벨업 > ... )

// 이름 ㅡ form과 input(text)
const nameForm = document.getElementById('name-form');
const nameInput = document.querySelector('#name-form input');

let savedName = '';
let charcterType = '';


// 캐릭터선택 ㅡ input(button)
const wizardButton = document.getElementById('select-wizard');  
const tankerButton = document.getElementById('select-tanker');


function typeWizard() {
    const hero = new Hero(savedName, 100, 15);
    logMessage(hero.name + ' Wizard님의 모험이 시작됩니다.');

    while(!gameover) {
        const monster = makeMonster();
        logMessage('❕ ' + monster.name + '을 마주쳤습니다. 전투가 시작됩니다.', 'green');
        battle = true;
        while(battle) {
            hero.attack(monster);
            if(monster.hp > 0) {
                monster.attack(hero);
            }
        }
    }


}

function typeTanker() {
    const hero = new Hero(savedName, 150, 10);
    logMessage(hero.name + ' Tanker님의 모험이 시작됩니다.');

    while(!gameover) {
        const monster = makeMonster();
        logMessage('❕ ' + monster.name + '을 마주쳤습니다. 전투가 시작됩니다.', 'green');
        battle = true;
        while(battle) {
            hero.attack(monster);
            if(monster.hp > 0) {
                monster.attack(hero);
            }
        }
    }


}


// 이름을 저장함 ㅡ 캐릭터 선택
nameForm.addEventListener('submit', nameSave);

function nameSave() {
    savedName = nameInput.value;

    wizardButton.addEventListener('click', typeWizard);
    tankerButton.addEventListener('click', typeTanker);
}





