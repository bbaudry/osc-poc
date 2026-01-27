This project adapts [p5js-osc](https://github.com/genekogan/p5js-osc/tree/master) to let a [p5](https://p5js.org/) sketch interact with a [nannou](https://nannou.cc/) sketch through [osc](https://opensoundcontrol.stanford.edu/index.html).

First ```npm install``` to build ```bridge.js```

To run the project
- ```node bridge.js```
- run the p5 sketch: open ```reve/index.html``` with a local server

The current version of the sketch randomly draws a white square, at a random location. Each time it draws a square, the sketch sends a '/show' event through osc, as well as the x and y coordinates of the upper left corner of the square.