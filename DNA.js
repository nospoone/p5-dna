class DNA {
	constructor(length, init) {
		init = (init === undefined) ? true : init;

		this.cells = [];

		if (init) {
			var cell = null;
			var lastCellStart = 0;
			for (var i = 0; i < length; i++) {
				this.cells[i] = {};
				if (cell === null || lastCellStart + cell.time + cell.delay === i) {
					lastCellStart = i;
					cell = { 
						amount: (random() < 0.2) ? random(0, TWO_PI) : 0,
						time: floor(random(0, 15)),
						delay: floor(random(0, 15))
					}
				}

				if (i < lastCellStart + cell.time) {
					this.cells[i].amount = cell.amount / cell.time;
				} else {
					this.cells[i].amount = 0;
				}
			}
		}
	}

	static crossbreed(mother, father) {
		var split = floor(random(0, maxFrameCount));
		var newDNA = new DNA(maxFrameCount, false);

		for (var i = 0; i < maxFrameCount; i++) {
			if (i < split) {
				newDNA.cells[i] = mother.cells[i];
			} else {
				newDNA.cells[i] = father.cells[i];
			}
		}

		return newDNA;
	}

	mutate() {
		for (var i = 0; i < this.cells.length; i++) {
			if (random() < 0.07) {
				this.cells[i].amount = (random() < 0.2) ? random(0, TWO_PI) : 0;
			}
		}
	}
}