window.onload = function(){
    
var div1 = document.getElementById("div1");
var fenshu = document.getElementById("fenshu");
var scaudio = document.getElementById("scaudio");
var gameaudio = document.getElementById("gameaudio");
var select = document.getElementById("selectop");
var but = document.getElementById("but");
var times = document.getElementById("times");
var arr = [];
var size = 20;
var dir = "right";
var speed = 100;
var s = 0;
var gameIsPlay = false;
//生成一条蛇
function createSnake(){
    for(var i = 0; i < 4; i++){
        //生成一个span
    var span = document.createElement("span");
    arr.push(div1.appendChild(span));
    span.style.left = i*size +"px";
    span.style.top = 0;
    }
}
//移动小蛇
function moveSnake(){
    var head = arr[arr.length - 1];
    var Left = head.style.left;
    var Top = head.style.top;
    if(dir == "right"){
        arr[0].style.left = parseInt(Left) + size + "px";
        arr[0].style.top = parseInt(Top)+"px";
    }
    if(dir == "left"){
        arr[0].style.left = parseInt(Left) - size + "px";
        arr[0].style.top = parseInt(Top)+"px";
    }
    if(dir == "bottom"){
        arr[0].style.left = parseInt(Left)+"px";
        arr[0].style.top =parseInt(Top) + size  + "px";
    }
    if(dir == "top"){
        arr[0].style.left = parseInt(Left)+"px";
        arr[0].style.top =parseInt(Top) - size  + "px";
    }

    //碰撞检测
    var fen = 10;
    if(parseInt(Left) == x && parseInt(Top) == y){
        //得分
        scoreAnimation()
        fenshu.innerHTML = (Number(fenshu.innerHTML) + fen) ;
        // fenshu.className = "hide";
        //音效
        scaudio.play()
        createfood();
        addspan();
    }
    //死亡检测
    if(parseInt(Left) > 480 || parseInt(Left) < 0 || parseInt(Top) > 480 || parseInt(Top)<0){
        clearInterval(t);
        clearInterval(gameTime);
        gameaudio.play();
        gameIsPlay = false;
    }

    //碰撞自身死亡
    arr2 = [];
    for(var j = 0; j < arr.length; j++){
       var createObject={}
       createObject.x= parseInt(arr[j].style.left);
       createObject.y= parseInt(arr[j].style.top);
        arr2.push(createObject);
    }
    arr2.pop();
    //让蛇头和新数组的值比对
    for(var i = 0; i < arr2.length; i++){
        if(parseInt(Left) == arr2[i].x && parseInt(Top) == arr2[i].y){
            clearInterval(t);
            clearInterval(gameTime);
            gameaudio.play();
            gameIsPlay = false;
        }
    }

    arr.push(arr.shift());
}

//分数动画
function scoreAnimation(){
fenshu.style.top = "-25px";
fenshu.style.opacity = 0;
setTimeout(function(){
    fenshu.style.top = 0;
    fenshu.style.opacity = 1;
    $("#fenshu").changeColor()  
},500)
}

function ready(){
createfood();   
createSnake();
gameIsPlay = true
}
//清空数据
function clear(){
dir = "right";
arr=[];
arr2=[];
speed = select.value;
fenshu.innerHTML = 0;
s = 0;
div1.innerHTML ="";
times.innerHTML = 0;

}
//难度选择
select.onchange = function(){
speed =  this.value; 
}
//点击开始
but.onclick =function(){
if(!gameIsPlay){
     clear();
    t = setInterval(function(){
        moveSnake()
    },speed)
    clock();
    ready();
}

}
//游戏时间
function clock(){
gameTime =  setInterval(function(){
    s++
    if(s > 60){
      var minutes =  Math.floor( s/60);
      var sec = s - minutes *60;
      times.innerHTML = minutes + "分"+ sec + "秒"
    }else{
        times.innerHTML = s + "秒"
    }
    $("#times").changeColor()  
},1000)
}
//生成随机食物
function createfood(){
//当页面里有食物，先清除页面上的食物
var food = div1.getElementsByTagName("i")[0];
if(food){
    div1.removeChild(food)
}
//生成一个食物
var food =  document.createElement("i");
x = Math.round(Math.random()*24)*size;
y = Math.round(Math.random()*24)*size;
div1.appendChild(food);
food.style.left = x + "px";
food.style.top = y + "px";
}
//生成一个新span，添加到蛇尾
function addspan(){
var span = document.createElement("span");
div1.appendChild(span);
span.style.left = arr[0].style.left;
span.style.top = arr[0].style.top;
arr.unshift(span);
}

//键盘操纵
window.onkeydown = function(event){
if(event.keyCode == 39 && dir != "left"){
    dir = "right";
}
if(event.keyCode == 40 && dir != "top"){
    dir = "bottom";
}
if(event.keyCode == 37 && dir != "right"){
    dir = "left"
}
if(event.keyCode == 38 && dir != "bottom"){
    dir = "top"
}
if(event.keyCode == 13){
    
    if(!gameIsPlay){
        clear();
        t= setInterval(function(){
        moveSnake()
        },speed);
        clock()
        ready()
        }
}
    
}

$.fn.extend({
    changeColor:function(color){
        if(color === undefined){
            var colorArr = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
            var result = "#";
            for(var i = 0; i < 6; i++){
            var random =  Math.round(Math.random()*15)
            result = result + colorArr[random]
            }
            this.css({
                color:result
            })
        }else{
            this.css({
                color:color
            })
        }
    }
})
$(".sp1").changeColor()
$(".sp2").changeColor()
$(".sp3").changeColor()
$(".sp4").changeColor()
$(".sp5").changeColor()
}