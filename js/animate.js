var tou = document.getElementById("tou");
var wenzi = document.getElementById("wenzi");
var box = document.getElementById("box");
var oNavlist = document.getElementById("nav").children;
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var gufeng = document.getElementsByClassName("gufeng");
var bofang = document.getElementsByClassName("bofang");
var gu = document.getElementsByClassName("gu");
var index = 1;
var timer;
var isMoving = false;
var k = 1;
var i;
var arr = ["#FFB7FF","#FFF","#7F0","#FFA488","#E38EFF","#F7F","#6F6","#3FA","#FF0","#3FF","#0FF","#600030","#000079","#003E3E","#006000"];
setInterval(function(){
	if(5 * k > 2000){
		wenzi.style.left = "1000px";
		k = 1;
	}
	wenzi.style.left = (1000 - 5 * k) + 'px';
	k++;
},100)
setInterval(function(){
	i = Math.floor(Math.random() * (arr.length - 1)) + 1;
	console.log(i);
	wenzi.style.color = arr[i];
},1000)
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}	
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
box.onmouseover = function(){
	animate(left,{opacity:50})
	animate(right,{opacity:50})
	clearInterval(timer)
}
box.onmouseout = function(){
	animate(left,{opacity:0})
	animate(right,{opacity:0})
	timer = setInterval(next,3000);
}
right.onclick = next;
left.onclick = prev;
for(var i = 0;i < oNavlist.length;i++){
	oNavlist[i].index = i;
	oNavlist[i].onclick = function(){
		index = this.index + 1;
		navmove();
		animate(slider,{left:-1200 * index});
	}
}
function next(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index++;
	navmove();
	animate(slider,{left:-1200 * index},function(){
		if(index == 6){
			slider.style.left = '-1200px';
			index = 1;
		}
		isMoving = false;
	});
}	
function prev(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index--;
	navmove();
	animate(slider,{left:-1200 * index},function(){
		if(index == 0){
			slider.style.left = '-6000px';
			index = 5;
		}
		isMoving = false;
	});
}
function navmove(){
	var i
	for(i = 0;i < oNavlist.length;i++){
		oNavlist[i].className = "";
	}
	if(index > 5){
		oNavlist[0].className = "active";
	}
	else if(index <= 0){
		oNavlist[4].className = "active";
	}else{
		oNavlist[index - 1].className = "active";
	}
}
timer = setInterval(next,3000);
bofang[0].onmouseover = function(){
	bofang[0].style.display = 'block';
	gu[0].style.marginTop = '-50px';
}
gufeng[0].onmouseover = function(){
	bofang[0].style.display = 'block';
	gu[0].style.marginTop = '-50px';
}
gufeng[0].onmouseout = function(){
	bofang[0].style.display = 'none';
	gu[0].style.marginTop = '0px';
	
}