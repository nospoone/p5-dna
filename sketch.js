var currentFrame = 0;
var maxFrameCount = 250;

var generation = 0;

var baseTextY = 25;

var totalCreatures = 50;
var alive = 0;

var goal;
var population;

function setup() {
	createCanvas(windowWidth, windowHeight);
	goal = createVector(width / 2, height - 50)
	population = new Population(totalCreatures);
}

function draw() {
	background(55);

	currentFrame = (currentFrame + 1) % maxFrameCount;
	alive = 0;

	population.update();
	population.draw();

	if (currentFrame === 0) {
		generation++;
		population.reset();
		/*
		var highestFitness = 0;
		for (var i = 0; i < Rockets.length; i++) {
			Rockets[i].calculateFitness();
			if (Rockets[i].fitness > highestFitness) {
				highestFitness = Rockets[i].fitness;
			}
			Rockets[i].reset();
		}
		
		console.log(highestFitness);
		*/
	}

	push();
	textSize(16);
	fill(255);
	stroke(0);
	strokeWeight(2);
	text("Frames: " + (currentFrame % maxFrameCount) + "/" + maxFrameCount, 10, baseTextY);
	text("Generation: " + generation, 10, baseTextY + 23);
	text(population.currentlyAlive + "/" + totalCreatures + " creatures still alive.", 10, baseTextY + 23 * 2);
	pop();

	push();
	noStroke();
	fill(100, 65, 164);
	ellipse(goal.x, goal.y, 25, 25);
	pop();

	/*
	push();
	translate(width / 2, height / 2);
	noFill();
	stroke(255);
	rotate(n);
	n += 0.05;
	if (s >= 500) {
		d = -2;
	} else if (s <= 100) {
		d = 2;
	}
	s += d;
	rect(-(s / 2), -(s / 2), s, s);

	pop();
	*/
}