class Creature extends Entity {
	constructor(position, dna) {
		super(position);

		this.width = 10;
		this.height = 30;
		this.speed = 5;

		this.DNA = (dna === undefined) ? new DNA(maxFrameCount) : dna;

		this.originalPosition = position.copy();

		this.maxVelocity = createVector(10, 10);
		this.angle = (random(PI / 4, -PI / 4));

		this.alive = true;

		this.fitness = null;
	}

	update() {
		if (this.alive) {
			this.checkCollisions();
			if (this.DNA.cells[currentFrame].amount !== 0) {
				this.steer(this.DNA.cells[currentFrame].amount);
			}
			this.velocity = p5.Vector.fromAngle(this.angle + PI / 2).mult(this.speed);
		}

		super.update();
	}

	draw() {
		super.draw();

		push();
		strokeWeight(2);
		if (!this.alive) {
			fill(255, 0, 0);
			stroke(200, 0, 0);
		} else if (this.arrived) {
			fill(0, 255, 0);
			stroke(0, 200, 0);
		} else {
			fill(127);
			stroke(200);
		}
		translate(this.position.x, this.position.y);
		rotate(this.angle);
		rect(0, 0, this.width, this.height);
		pop();
	}

	steer(direction) {
		this.angle = direction;
	}

	reset() {
		this.position = this.originalPosition.copy();
		this.angle = (random(PI / 4, -PI / 4));
		this.DNA = new DNA(maxFrameCount);
		this.alive = true;
		this.enabled = true;
	}

	checkCollisions() {
		if (this.position.x < 0 || this.position.y < 0 || this.position.y > height || this.position.x > width) {
			this.alive = false;
			this.enabled = false;
		}

		if (dist(this.position.x, this.position.y, goal.x, goal.y) < 10) {
			this.arrived = true;
			this.enabled = false;
		}
	}

	calculateFitness() {
		if (!this.arrived) {
			this.fitness = max(0, map(dist(this.position.x, this.position.y, goal.x, goal.y), 914, 0, 0, 1));
		} else {
			this.fitness = 2;
		}
	}
}