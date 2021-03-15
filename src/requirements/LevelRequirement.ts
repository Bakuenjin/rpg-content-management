import { Character, IRequirement } from "@bakuenjin/rpg-core";

export default class LevelRequirement implements IRequirement {

	private _level: number

	constructor(level: number) {
		this._level = level
	}

	getInfo(): string {
		return `Level: ${this._level}`
	}

	isFulfilled(char: Character): boolean {
		return char.getLevelInfo().level >= this._level
	}

	apply(char: Character): boolean {
		return this.isFulfilled(char)
	}

}