/*
var Entity = function (position) {
	this.position = position.copy();
	this.acceleration = createVector(random(-0.3, 0.3), random(-0.3, 0.3));
	this.velocity = createVector();
}

Entity.prototype.update = function () {
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
}

Entity.prototype.display = function () {
	stroke(200);
	strokeWeight(2);
	fill(127);
	ellipse(this.position.x, this.position.y, 24, 24);
}
*/

class Entity {
	constructor(position) {
		this.position = position.copy();
		this.acceleration = createVector();
		this.velocity = createVector();
		this.maxVelocity = null;
		this.enabled = true;
	}

	update() {
		if (this.enabled) {
			this.velocity.add(this.acceleration);
			if (this.maxVelocity !== null) {
				this.velocity.x = constrain(this.velocity.x, -this.maxVelocity.x, this.maxVelocity.x);
				this.velocity.y = constrain(this.velocity.y, -this.maxVelocity.y, this.maxVelocity.y);
			}
			this.position.add(this.velocity);
		}
	}

	draw() {}
}