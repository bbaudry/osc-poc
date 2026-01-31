var x, y, hu,socket,cnv,w,h;

function setup() {
	w=windowWidth
	h=windowHeight
	cnv=createCanvas(w, h);
	//centerCanvas()
	colorMode(HSB, 360, 100, 100, 250);
 	hu=random(360)
 	g=random(255)
	setupOsc(12000, 3334);
}
function centerCanvas() {
    var x = (windowWidth-w) / 2;
    var y = (windowHeight - h) / 2;
    cnv.position(x, y);
}


carres=[]

function draw() {
	background(0, 0, 0);
	console.log(carres.length)
	if(random()<0.005 && carres.length<2){
		let left
		if(carres.length==1){
			left=carres[0].left
			left?carres.push(new Carre(false)):carres.push(new Carre(true))
		}
		else{
			random()<0.5?left=true:left=false
			carres.push(new Carre(left))
		}
	}
	for(c in carres){
		carres[c].update()
		if(carres[c].live){
			carres[c].display()
			let gauche
			carres[c].left?gauche=1:gauche=0
			sendOsc('/left',gauche)
			sendOsc('/largeur',carres[c].largeur)
			sendOsc('/hauteur',carres[c].hauteur)
			sendOsc('/alpha',carres[c].alpha)
		}
		else{
			carres.splice(c,1)
		}
	}
}


class Carre {
    constructor(left) {
		this.left=left
		if(left){
			let xratio=random(0.2,0.25)
			let yratio=random(0.48,0.5)
			this.x=xratio*w		
        	this.y=yratio*h
        	this.duration=Math.floor(random(210,424))
        	this.largeur=(0.25-xratio)*2*w
			this.hauteur=(0.5-yratio)*2*h
			this.count=0
			this.live=true
			this.alpha=255
			this.blink=true
		}
		else{
        	this.x=w*0.5
        	this.y=0
        	this.duration=Math.floor(random(210,424))
        	this.largeur=w*0.5
			this.hauteur=h
			this.count=0
			this.live=true
			this.alpha=255
			this.blink=false
		}
    }

    update() {  
		if(this.blink){
			random()<0.5?this.alpha=0:this.alpha=255
		}else{
		this.alpha-=0.5}
		this.count++
		if(this.count>this.duration){this.live=false}
    } 

    display() {
        fill(0,0,100,this.alpha)
        noStroke()
        rect(this.x,this.y,this.largeur,this.hauteur)
    }

}





	function receiveOsc(address, value) {
		console.log("received OSC: " + address + ", " + value);

		if (address == '/test') {
			x = value[0];
			y = value[1];
		}
	}

	function sendOsc(address, value) {
		socket.emit('message', [address].concat(value));
	}

	function setupOsc(oscPortIn, oscPortOut) {
		socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
		socket.on('connect', function() {
			socket.emit('config', {
				server: { port: oscPortIn,  host: '127.0.0.1'},
				client: { port: oscPortOut, host: '127.0.0.1'}
			});
						console.log("hi")

		});
		socket.on('message', function(msg) {
			if (msg[0] == '#bundle') {
				for (var i=2; i<msg.length; i++) {
					receiveOsc(msg[i][0], msg[i].splice(1));
				}
			} else {
				receiveOsc(msg[0], msg.splice(1));
			}
		});
	}
