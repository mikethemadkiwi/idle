let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext("2d");
let ls = localStorage;
//
let viewer = {
    window: { w: window.innerWidth, h: window.innerHeight, hw: 0, hh: 0 },
    tarpos: { x: 0, y: 0, z: 0 },
    actpos: { x: 0, y: 0, z: 0 },
    frame: { framecurrent: 0, frametotal: 0, framepersec: 0},
    tick: { tickcurrent: 0, ticktotal: 0, tickpersec: 0 },
    fps: 0,
    game_running: true,
    show_fps: true,
    show_utils: true,
    LAST_FRAME_TIME: 0
};
//
let mouse = {
    X: 0,
    Y: 0,
    lastLClickX: 0,
    lastLClickY: 0,
    lastRClickX: 0,
    lastRClickY: 0,
    lastMClickX: 0,
    lastMClickY: 0,
    isdownL: false,
    isdownR: false,
    isdownM: false,
    delta: 0
};
//
function resizelayout() {
    viewer.window.w = window.innerWidth;
    viewer.window.h = window.innerHeight;
    viewer.window.hw = window.innerWidth / 2;
    viewer.window.hh = window.innerHeight / 2;
    csw = (window.innerWidth-20)
    csh = (window.innerHeight-20)
    // canvas.width = csw;
    // canvas.height = csh;
    canvas.style.width = `${csw}px`;
    canvas.style.height = `${csh}px`;
};
//
window.onload = function () {
    resizelayout();
};
//
window.onresize = function () {
    resizelayout();
};
//
canvas.oncontextmenu = function (event) {
    event = event || window.event;
    if (event.stopPropagation)
    event.stopPropagation();
    event.cancelBubble = true;
    return false;
};
//
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
//
addEventListener('mousemove', function (evt) {
    // console.log("mousemove",evt);
    var mousePos = getMousePos(canvas, evt);
    mouse.X = mousePos.x;
    mouse.Y = mousePos.y;
}, false);
//
addEventListener("mousedown", function (evt) {
    // console.log("mousedown",evt);
    if (evt.altKey == true) { console.log('alt key click'); };
    if (evt.ctrlKey == true) { console.log('ctrl key click'); };
    if (evt.shiftKey == true) { console.log('shift key click'); };
    if (evt.button == 0) { // Left CLick
        mouse.lastLClickX = mouse.X;
        mouse.lastLClickY = mouse.Y;
        mouse.isdownL = true;
    }
    if (evt.button == 2) { // Right Click
        mouse.lastRClickX = mouse.X;
        mouse.lastRClickY = mouse.Y;
        mouse.isdownR = true;
    }
    if (evt.button == 1) { // Middle Click
        mouse.lastMClickX = mouse.X;
        mouse.lastMClickY = mouse.Y;
        mouse.isdownM = true;
    }

}, false);
//Mouse Wheel -1 or +1 output
addEventListener("mousewheel", function (evt) {
    // console.log("mousewheel",evt);
    //clickmove(mouse.X, mouse.Y, 0);
    var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    mouse.delta = delta;
}, false);

// mouse UP
addEventListener("mouseup", function (evt) {
    // console.log("mouseup",evt);
    if (evt.button == 0) { // Left click
        mouse.isdownL = false;
    }
    if (evt.button == 2) { // Right Click
        mouse.isdownR = false;
    }
    if (evt.button == 1) { // Middle Click
        mouse.isdownM = false;
    }

}, false);
//
let randomnumber = function (v) {
    var tmpnum = Math.floor(Math.random() * v + 1);
    return tmpnum;
};
//
function randomFromInterval(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
};
//
function btnMove(){
    console.log('click')
}
//
function btnMine(){
    console.log('click')
}
//
function btnCombat(){
    console.log('click')
}
//
function gameLoop(TIME){    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    viewer.fps = 1 / ((performance.now() - viewer.LAST_FRAME_TIME) / 1000);
    viewer.LAST_FRAME_TIME = TIME /* remember the time of the rendered frame */
    // if (viewer.show_fps) showFPS();
    // ctx.fillStyle = "green";
    // ctx.font      = "normal 8pt Arial";
    // if(viewer.fps<30){ ctx.fillStyle = "red"; }
    // ctx.fillText(`fps:${(viewer.fps.toFixed(2))}`, 0, 0);
    ctx.font = '12px Lucida Console';
    ctx.fillStyle = 'green';
    ctx.fillText('Bubblespace 0.0.3', 10, 22);
    if (viewer.show_utils) {
        ctx.font = '12px Lucida Console';
        ctx.fillStyle = 'white';
        ctx.fillText('|Canvas Size| ' + canvas.width + 'x' + canvas.height + ' |Window Size| '+window.innerWidth+'x'+window.innerHeight+'', 10, 58);
        if (viewer.show_fps){
            if(viewer.fps<=15){ctx.fillStyle = 'red';}
            else{
                if(viewer.fps>=30){ctx.fillStyle = 'green';}
                else{ctx.fillStyle = 'yellow';}
            }
            ctx.fillText('|FPS| '+viewer.fps.toFixed(2)+'', 10, 67);
        }
        ctx.fillStyle = 'white';        
        ctx.fillText('|MOUSE| pos:' + mouse.X + '/' + mouse.Y + ' Pressed| l:' + mouse.isdownL + ' m:' + mouse.isdownM + ' r:' + mouse.isdownR + '| Scroll|' + mouse.delta + '|', 10, 76);
    }
    if (viewer.game_running) requestAnimationFrame(gameLoop);
}
// detect screen size first attempt.
resizelayout()
gameLoop();