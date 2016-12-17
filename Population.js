class Population {
	constructor(amount) {
		this.creatures = [];
		this.matingPool = [];
		this.currentlyAlive = 0;
		this.amount = amount;

		for (var i = 0; i < amount; i++) {
			this.creatures.push(new Creature(createVector(width / 2, 10)));
		}
	}

	update() {
		this.currentlyAlive = 0;
		this.creatures.forEach(creature => {
			creature.update();
			this.currentlyAlive += (creature.alive) ? 1 : 0;
		});
	}

	draw() {
		this.creatures.forEach(creature => {
			creature.draw();
		});
	}

	reset() {
		this.evaluate();
		this.selection();
	}

	evaluate() {
		var highestFitness = 0;
		this.creatures.forEach(creature => {
			creature.calculateFitness();
			if (creature.fitness > highestFitness) {
				highestFitness = creature.fitness;
			}
		});

		// scales them down to 0 - highestFitness
		this.creatures.forEach(creature => {
			creature.fitness /= highestFitness;
		});

		this.matingPool = [];
		this.creatures.forEach(creature => {
			var probability = creature.fitness * 100;
			for (var i = 0; i < probability; i++) {
				this.matingPool.push(creature);
			}
		});
	}

	selection() {
		var newCreatures = [];

		this.creatures.forEach(creature => {
			var mother = random(this.matingPool).DNA;
			var father = random(this.matingPool).DNA;
			var childDNA = DNA.crossbreed(mother, father);

			newCreatures.push(new Creature(createVector(width / 2, 10), childDNA));
		});

		this.creatures = newCreatures;
	}
}