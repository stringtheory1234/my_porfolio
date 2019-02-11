var canvas=document.querySelector('canvas');
canvas.width=(window.innerWidth);
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');
// // c.fillStyle="pink";
// // c.fillRect(10, 10, 30, 10);

// //Line

// // c.beginPath();
// // c.moveTo(10, 300);
// // c.lineTo(2000, 10);
// // c.strokeStyle="blue";
// // c.stroke();

// //arc or Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.stroke();


// //For Loop

// for(var i=0; i<100;i++){
// 	var x=Math.random()*window.innerWidth;
// 	var y=Math.random()*window.innerHeight;
// 	c.beginPath();
// 	c.arc(x, y, 30, 0, Math.PI*2, false);
// 	var randomColor = "#" + Math.floor(Math.random() * 25100000).toString().slice(3, 6); 
// 	c.strokeStyle = randomColor;﻿
// 	c.stroke();
// }

// function Circle(x, y){
// 	this.x=x;
// 	this.y=y;
// 	this.draw=function(){

// 	}
// }

// var circle=new Circle(200, 200);
// circle.draw();


// var x=Math.random()*window.innerWidth;
// var y=Math.random()*window.innerHeight;
// var dx=7;
// var dy=7;
// var radius=30;

var mouse={
	x:undefined,
	y:undefined
};

var maxRadius=50;
//var minRadius=5;

var colorArray=[
	'#63A69F',
	'#F2E1AC',
	'#F2836B',
	'#F2594B',
	'#CD2C24'
];

window.addEventListener('mousemove', function(event){
	mouse.x=event.x;
	mouse.y=event.y;
})

window.addEventListener('resize', function(){
	canvas.width=(window.innerWidth);
	canvas.height=window.innerHeight;
	init();
})
var circleArray=[];
function Circle(x, y, dx, dy, radius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.minRadius=radius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
	this.draw=function(){	
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.fillStyle=this.color;
		c.fill();
	}
	this.update=function() {
		if(this.x+this.radius>innerWidth || this.x-this.radius<0){
			this.dx=-this.dx;
		}
		if(this.y+this.radius>innerWidth || this.y-this.radius<0){
			this.dy=-this.dy;
		}
		this.x += this.dx;
		this.y+=this.dy;

		//interactivity 
		if(((mouse.x - this.x) < 30 && (mouse.x - this.x > -30))&&
			((mouse.y - this.y < 30)&&(mouse.y - this.y > -30))){
			if(this.radius<maxRadius)
			this.radius+=1;
		}
		else if(this.radius>this.minRadius)
		{
			this.radius--;
		}
		this.draw();
	}
}


init();

function init(){
	circleArray=[];
	for (var i = 0; i < 200; i++) {
		var x= Math.random()*innerWidth;
		var y=Math.random()*innerHeight;
		var dx=(Math.random()-0.5)*2;
		var dy=(Math.random()-0.5)*2;
		var radius=(Math.random()*5)+1;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}
function animate() {
			requestAnimationFrame(animate);
			c.clearRect(0, 0, innerWidth, innerHeight);

			for (var i = 0; i < circleArray.length; i++) {
				circleArray[i].update();
			}

			// c.beginPath();
			// c.arc(x, y, radius, 0, Math.PI*2, false);
			// c.strokeStyle='blue';
			// c.stroke();
			// if(x+radius>innerWidth||x-radius<0){
			// 	dx=-dx;
			// }
			// if(y+radius>innerHeight||y-radius<0){
			// 	dy=-dy;
			// }
			// x+=dx;
			// y+=dy;
	}

animate();