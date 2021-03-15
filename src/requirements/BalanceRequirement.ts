import { Character, IRequirement } from "@bakuenjin/rpg-core";

export default class BalanceRequirement implements IRequirement {

	private _cost: number

	constructor(cost: number) {
		this._cost = cost
	}

	getInfo(): string {
		return `Cost: ${this._cost}`
	}

	isFulfilled(char: Character): boolean {
		return char.getBalance() >= this._cost
	}

	apply(char: Character): boolean {
		if (this.isFulfilled(char)) {
			char.removeFromBalance(this._cost)
			return true
		}
		else return false
	}

}