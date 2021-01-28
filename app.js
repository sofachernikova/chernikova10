var area = document.getElementById('area');
var cell = document.getElementsByClassName('cell');
var currentPlayer = document.getElementById('curPlyr');

var retryBtn = document.getElementById('retry-btn');
var resetBtn = document.getElementById('reset-btn');

//let winner = "x";

var player = "x";
var stat = {
    'x': 0,
    'o': 0,
    'd': 0
}
var winIndex = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

for (var i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}

function cellClick() {

    var data = [];

    if (!this.innerHTML) {
        this.innerHTML = player;
    } else {
        swal("Ячейка занята");
        return;
    }

    for (var i in cell) {
        if (cell[i].innerHTML == player) {
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if (checkWin(data)) {
        stat[player] += 1;
        swal("Выиграл: " + player);
    } else {
        var draw = true;
        for (var i in cell) {
            if (cell[i].innerHTML == '') draw = false;
        }
        if (draw) {
            stat.d += 1;
            swal("Ничья");
        }
    }

    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin(data) {
    for (var i in winIndex) {
        var win = true;
        for (var j in winIndex[i]) {
            var id = winIndex[i][j];
            var ind = data.indexOf(id);

            if (ind == -1) {
                win = false
            }
        }

        if (win) return true;
    }

    return false;
}

function restart(text) {

    swal(text);
    player = player == "x" ? "o" : "x";
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    updateStat();
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    //document.getElementById('sD').innerHTML = stat.d;
}

retryBtn.addEventListener('click', retry, false);
resetBtn.addEventListener('click', newRound, false);

function retry() {
    //alert('Работает');
    currentPlayer.innerHTML = "X";
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }

    nullStat();
}

function nullStat() {
    stat.x = 0;
    stat.o = 0;
    document.getElementById('sX').innerHTML = 0;
    document.getElementById('sO').innerHTML = 0;
}

function newRound() {
    //alert('Работает');
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var retryBtn2 = document.getElementById('retry-btn2');

window.onload = function() {
    document.getElementById('canvas').onclick = function(event) {
        console.log(event);
        ctx.fillStyle = '#4fff5e';
        ctx.strokeStyle = '#080808';
        ctx.lineWidth = 6;
        //левая линия
        ctx.moveTo(150, 10);
        ctx.lineTo(10, 140);
 
        //правая линия
        ctx.moveTo(150, 10);
        ctx.lineTo(290, 140);
                
        //нижняя линия
        ctx.moveTo(10, 140);
        ctx.lineTo(290, 140);
 
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
    }
    retryBtn2.onclick = function(event) {
        console.log(event);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 300, 300)
    }
}
