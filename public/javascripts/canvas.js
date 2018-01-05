// Initial Setup--------------------------------------------------------------

//var aux = require('./materia.js');
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var subjects, clickedcircle = -1, search_up = false;
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.cursor = "grab";

// ---------------------------------------------------------------------------

// Variables------------------------------------------------------------------
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};
var mat_selec;
function GetMat(){
	return mat_selec;
}
var primeravuelta = true;
var materias = [
	"Calculo I", //Busquedas escondidas como atributo mat
	"Calculo II",
	"Calculo III",
	"Algebra I",
	"Algebra II",
	"Intro a la Prog.",
	"Programacion I",
	"Programacion II",
	"Fisica I",
	"Fisica II",
	"Fisica III",
	"Des. Esp. Emprendedor",
	"Calculo II",
	"Calculo III",
	"Algebra I",
	"Algebra II",
	"Intro a la Prog.",
	"Programacion I",
	"Programacion II",
	"Fisica I",
	"Fisica II",
	"Fisica III",
	"Des. Esp. Emprendedor",
	"pra",
	"pre",
	"pre",
	"pro",
	"aru",
	"ara",
	"are",
	"are",
	"aro",
	"aru",
	"bra",
	"bre",
	"bre",
	"bro",
	"bru",
	"cra",
	"cre",
	"cre",
	"cro",
	"cru",
	"dra",
	"dre",
	"dre",
	"dro",
	"dru",
	"era",
	"ere",
	"ere",
	"ero",
	"eru"
];
var xx1, xx2, yy1, yy2;
// ---------------------------------------------------------------------------

// Event Listeners------------------------------------------------------------
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	for(var i=0;i<subjects.length;i++){
		if(subjects[i].isvisible)
			subjects[i].almost_clicked(i);
	}
});
addEventListener("click", function(event) {
	mousePressed();
});
addEventListener("mousedown", function(event) {
	xx1 = mouse.x;
	yy1 = mouse.y;
	canvas.style.cursor = "grabbing";
	start = tiempo();
});
var escrito="";

addEventListener("keyup", function(){
	var escrito = document.querySelectorAll('[name="inn"]')[0].value;
	if(escrito=="")
	for(let i=0; i<subjects.length; i++)
		subjects[i].isvisible=true;
	else
		clasificar(escrito);
});
addEventListener("mouseup", function(event) {
	xx2 = mouse.x;
	yy2 = mouse.y;
	canvas.style.cursor = "grab";
	var d = distance(xx1, yy1, xx2, yy2);
	var ang = angulo(xx1, yy1, xx2, yy2);

	end = tiempo();
	var t = end - start;

	if(t<0)
		t*=-1;
	else if (t>7000)//siete segundos con de pulsar el mouse o tocar
		t=7000;

	var vel = (d/t)*1000;
	var acel = vel/t;
	var ax = Math.cos(ang)*acel;
	var ay = Math.sin(ang)*acel;

	if(isNaN(ax))
		ax=0.5;
	if(isNaN(ay) )
		ay=0.5;
	if(xx2<xx1){
		ax = -1*Math.abs(ax);
	}else{
		if(ax<0){
			ax = Math.abs(ax);
		}
	}
	if(yy2<yy1){
		ay = -1*Math.abs(ay);
	}else{
		if(ay<0){
			ay = Math.abs(ay);
		}
	}
	for (let i = 0; i < subjects.length; i++) {
		if(subjects[i].isvisible)
			subjects[i].accelerate(ax,ay);
	}
	console.log(t);
	console.log(ax);
	console.log(ay);
});
// ---------------------------------------------------------------------------

//Funciones usadas------------------------------------------------------------
function abrirVentana(){
	var windowObjectReference;
	var strWindowFeatures = "menubar=no,location=yes,resizable=no,scrollbars=yes,status=yes";
	
	function openRequestedPopup() {
	  windowObjectReference = window.open("https://inscribirme.herokuapp.com/materia", "CNN_WindowName", strWindowFeatures);
	}
}
function click(x,y) {
	var element = document.elementFromPoint(x,y);
	element.click();
 }
function mousePressed(){
	for(var i=0;i<subjects.length;i++){
		if(subjects[i].isvisible)
			subjects[i].clicked ();
	}
}

function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function distance(x1, y1, x2, y2){
	var a = x1 - x2
	var b = y1 - y2
	
	return Math.sqrt( a*a + b*b );
}
function angulo(x1, y1, x2, y2){	
	var xx = x1 - x2
	var yy = y1 - y2
	return Math.atan(yy/xx);
}
function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
function tiempo() {
    var d = new Date();
    var x = document.getElementById("demo");
    var h = addZero(d.getHours(), 2);
    var m = addZero(d.getMinutes(), 2);
    var s = addZero(d.getSeconds(), 2);
    var ms = addZero(d.getMilliseconds(), 3);
    return (parseFloat(m)*60000+parseFloat(s)*1000+ms);
}
function clasificar(palabra){
	var control;
	palabra = palabra.toUpperCase();
	for(let i=0; i<subjects.length; i++){
		let nombress = (subjects[i].nombre).toUpperCase();
		//var letras = [];
		var letrasBool = [];
		for(let j=0;j<palabra.length;j++){
			//letras.push(palabra.charAt(j));
			letrasBool.push(nombress.indexOf(palabra.substring(j,j+1)));
			nombress = reemplazar(nombress,nombress.indexOf(palabra.substring(j,j+1)),"[");
			//nombress.replaceAt(nombress.indexOf(palabra.substring(j,j+1),"["));//cambio para que no moleste mas
			//console.log(letrasBool[j]);
			if(subjects[i].nombre=="Programacion I")
				console.log(nombress)
			if(letrasBool[j]==-1){
				subjects[i].isvisible = false;
			}
		}
		//console.log("------------------------");
		if(!subjects[i].isvisible){
			if(letrasBool.length==1 && letrasBool[0]!=-1){
				subjects[i].isvisible = true
			}else{
				for(let j=0;j<letrasBool.length-1;j++)
					if(letrasBool[j]!=-1&&letrasBool[j+1]!=-1){
						if(letrasBool[j]<letrasBool[j+1])
							subjects[i].isvisible = true;
					}else{
						subjects[i].isvisible = false;
						break;
					}
			}
		}else{
			if(letrasBool.length==1 && letrasBool[0]!=-1){
				subjects[i].isvisible = true
			}else{
				for(let j=0;j<letrasBool.length-1;j++){
					if(letrasBool[j]<letrasBool[j+1]){
						subjects[i].isvisible = true;
						continue;
					}else{
						subjects[i].isvisible = false;
						break;
					}
				}
			}
		}
	}
	
}
function toggleSearchForm() {
	document.getElementById('form').classList.toggle('active');
	if(document.getElementsByName('inn')[0].placeholder=='buscar'){
		document.getElementsByName('inn')[0].placeholder='escribe que materia buscas...';
		search_up = true;
	}else{
		document.getElementsByName('inn')[0].placeholder='buscar';
		search_up = false;
	}
}
function reemplazar(original, index, reemplazo) {
	//console.log(reemplazo);
	return original.substring(0, index) + reemplazo+ original.substring(index + reemplazo.length);
}
function eventFire(el, etype){
	if (el.fireEvent) {
	  el.fireEvent('on' + etype);
	} else {
	  var evObj = document.createEvent('Events');
	  evObj.initEvent(etype, true, false);
	  el.dispatchEvent(evObj);
	}
  }
// ---------------------------------------------------------------------------
// Objects--------------------------------------------------------------------

function subject(nombre, x, y, radius, r, g, b){
	this.x = x;             
	this.y = y;
	this.radius = radius;   
	this.radaux = radius;   
	this.r = r;				
	this.g = g;				
	this.b = b;
	this.nombre = nombre;
	this.flag = true;
	this.isvisible = true;
    this.velocity = {
        x: (Math.random() - 0.5)*2,
        y: (Math.random() - 0.5)*2
    };
    this.mass = 1*(Math.pow(this.radius,2)*Math.PI)/20100;

    this.draw = () =>{
		//---------Borde exterior y texto de materia
        c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.lineWidth = 10;

		c.strokeStyle = 'rgb(' + (this.r-2000) + ',' + (this.g-2000) + ',' + (this.b-2000) +')';//Con bordes
		c.stroke();//Con bordes
		c.fillStyle = 'rgb(' + (this.r+30) + ',' + (this.g+30) + ',' + (this.b+30) +')';
		c.fill();
		if(((this.r+30) > 210 && (this.g+30) > 210)||((this.g+30) > 210 && (this.b+30) > 210))	c.fillStyle = 'rgb(' + 51 + ',' + 51 + ',' + 51 +')';
		else	c.fillStyle = 'rgb(' + 255 + ',' + 255 + ',' + 255 +')';
		var font = "normal " + this.radius/3 +"px Lucida Console";//sans serif
		c.font = font;
		c.textBaseline = "center";
		c.textAlign = "center";
		c.fillText(this.nombre, this.x,this.y+this.radius/7, this.radius*2*0.9);
		c.closePath();
		// mitad superior e inferior
		if(!this.flag){
			c.beginPath();
			c.strokeStyle = 'rgb(' + 84 + ',' + 215 + ',' + 105 +')';//Con bordes
			c.fillStyle = 'rgb(' + 84 + ',' + 215 + ',' + 105 +')';
			c.arc(this.x+62, this.y-62, 20, 0, Math.PI * 2, false);
			c.lineWidth = 1;
			c.stroke();
			c.fill();
			var font = "bold " + (this.radius/2+10) +"px Comic Sans MS";//sans serif
			c.font = font;
			c.textBaseline = "center";
			c.textAlign = "center";
			c.fillStyle = 'rgb(' + 255 + ',' + 255 + ',' + 255 +')';
			c.fillText('+', this.x+62, this.y - 45);
			c.closePath();
			//----------------------------
			c.beginPath();
			c.strokeStyle = 'rgb(' + 77 + ',' + 131 + ',' + 165 +')';//Con bordes
			c.fillStyle = 'rgb(' + 77 + ',' + 131 + ',' + 165 +')';
			c.arc(this.x, this.y-62, 30, 0, Math.PI * 2, false);
			c.lineWidth = 1;
			c.stroke();
			c.fill();
			var font = "bold " + this.radius/4 +"px Comic Sans MS";//sans serif
			c.font = font;
			c.textBaseline = "center";
			c.textAlign = "center";
			c.fillStyle = 'rgb(' + 255 + ',' + 255 + ',' + 255 +')';
			c.fillText('VER', this.x, this.y - 50);
			c.closePath();
			//----------------------------
			c.beginPath();
			c.strokeStyle = 'rgb(' + 251 + ',' + 61 + ',' + 56 +')';//Con bordes
			c.fillStyle = 'rgb(' + 251 + ',' + 61 + ',' + 56 +')';
			c.arc(this.x-62, this.y-62, 20, 0, Math.PI * 2, false);
			c.lineWidth = 1;
			c.stroke();
			c.fill();
			var font = "bold " + this.radius/3 +"px Comic Sans MS";//sans serif
			c.font = font;
			c.textBaseline = "center";
			c.textAlign = "center";
			c.fillStyle = 'rgb(' + 255 + ',' + 255 + ',' + 255 +')';
			c.fillText('X', this.x-62, this.y - 50);
			c.closePath();
		}
	
		
	};
	this.update = subjectss =>{
		this.draw();
		
		if(this.isvisible){
			for(let i=0; i <  subjects.length; i++){
				if(subjects[i].isvisible){
					if(this === subjects[i]) continue ;
					const dist = distance(this.x, this.y, subjects[i].x, subjects[i].y)-(this.radius+subjects[i].radius);
					if(dist<(this.radius+subjects[i].radius)*0.09 && dist > -(this.radius+subjects[i].radius)*1.2){
						resolveCollision(this, subjects[i], 0.9);
						//console.log("No resolvi para 1.-"+this.nombre+" 2.-"+subjects[i].nombre);
					}
				}
			}
		}
        if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth)		this.velocity.x = -this.velocity.x;
		
		if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight)	this.velocity.y = -this.velocity.y;
		if(search_up)
			atraccion_repulsion = -0.002;
		else
			atraccion_repulsion = 0.0001;
		
		if(this.x>canvas.width/2)
			this.velocity.x = this.velocity.x-atraccion_repulsion;
		else
			this.velocity.x = this.velocity.x+atraccion_repulsion;
		if(this.y>canvas.height/2)
			this.velocity.y = this.velocity.y-atraccion_repulsion;
		else
			this.velocity.y = this.velocity.y+atraccion_repulsion;
		if(this.velocity.x>2)//limitador de velocidad para que las bolas no enloquezacan
			this.velocity.x=2;
		if(this.velocity.y>2)
			this.velocity.y=2;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
	};
	this.accelerate = function(ax, ay) {
		if((ax<0.6 && ax>-0.6) && (ay<0.6 && ay>-0.6)){
			this.velocity.x = randomIntFromRange(-4, 4)/10;
			this.velocity.y = randomIntFromRange(-4, 4)/10;
		}else{
			this.velocity.x += ax/2;
			this.velocity.y += ay/2;
		}
		
	};
	this.clicked = function(){
		var d = distance(mouse.x, mouse.y, this.x, this.y);
		if(d<this.radius && this.flag){
			console.log("Hice Click");
			this.radius = 100;
			this.flag = false;
			console.log(this.nombre);

		}else if(d<this.radius && !this.flag){
			var dok = distance(mouse.x, mouse.y, this.x+62, this.y-62);//radio 20
			var dver = distance(mouse.x, mouse.y, this.x, this.y-50);//radio 30
			//var dsalir = distance(mouse.x, mouse.y, this.x+62, this.y-62);
			if(dok<20){
				console.log("Quiero añadir");	
			}else if(dver<30){
				var testvalue = this.nombre;
				document.cookie = "testcookie=" + encodeURIComponent( testvalue );
				abrirVentana();
				//window.open("https://inscribirme.herokuapp.com/materia");
			}else{
				this.radius = this.radaux;
				this.flag = true;
			}
		}
	};
	this.almost_clicked = function(pos){
		var d = distance(mouse.x, mouse.y, this.x, this.y);
		if(d<this.radius){
			var dok = distance(mouse.x, mouse.y, this.x+62, this.y-62);//radio 20
			var dver = distance(mouse.x, mouse.y, this.x, this.y-50);//radio 30
			if(dok<20)
				canvas.style.cursor = "copy";
			else if(dver<30)
				canvas.style.cursor = "alias";
			else if(!this.flag)
				canvas.style.cursor = "zoom-out";	
			else
				canvas.style.cursor = "zoom-in";
			clickedcircle = pos;
		}else if(clickedcircle == pos){
			canvas.style.cursor = "grab";
			clickedcircle = -1;
		}
	};
}
// -------------------------------------------------------------------------------

// Implementation-----------------------------------------------------------------
function init() {
	subjects = [];

	for (let i = 0; i < materias.length; i++) {
		var radius = randomIntFromRange(30, 60);
		var x = randomIntFromRange(radius+canvas.width/4, 3*canvas.width/4 - radius);
		var y = randomIntFromRange(3*radius, 3*canvas.height/4 - radius);
		var r = randomIntFromRange(0, 255), g = randomIntFromRange(0, 255), b = randomIntFromRange(0, 255);
		//var color = 'rgb(' + r + ',' + g + ',' + b +')';
		if(i !== 0){
            for(let j=0; j<subjects.length; j++){
                if(distance(x, y, subjects[j].x, subjects[j].y)-(radius*2*0.7) < 0){//le quito el 30% de su tamaño para que pueda correr mas rapido la pag
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }
		subjects.push(new subject(materias[i], x, y, radius, r, g, b));
		//console.log(subjects[i].nombre+"<----"+subjects[i].x+"<----"+subjects[i].y+"<----"+subjects[i].r+"<----"+subjects[i].g+"<----"+subjects[i].b+"<----");
	}


}
// -------------------------------------------------------------------------------

// Animation Loop-----------------------------------------------------------------
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	subjects.forEach(subject => {
		if(subject.isvisible)
			subject.update();
	});
}
init();
/*if(primeravuelta){
	click(100, 100);
	primeravuelta = false;
}*/
animate();
// -------------------------------------------------------------------------------