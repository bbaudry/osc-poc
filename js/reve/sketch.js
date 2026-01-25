var x, y, hu,socket,cnv,w,h;

function setup() {
	w=700
	h=700
	cnv=createCanvas(w, h);
	centerCanvas()
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

function draw() {
	background(0, 0, 0);
	fill(hu,100, 100);
	ellipse(w*0.5, h*0.5, 100, 100);
	fill(0);
	text(mouseX, w*0.45, h*0.5)
}

	function receiveOsc(address, value) {
		console.log("received OSC: " + address + ", " + value);

		if (address == '/test') {
			x = value[0];
			y = value[1];
		}
	}

	function mouseClicked() {
			r=random(255)
			g=random(255)
			sendOsc("/x",mouseX)
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
