import { Armor, Character, IRequirement } from "@bakuenjin/rpg-core";

export default class ArmorRequirement implements IRequirement {

	private _armor: Armor

	constructor(armor: Armor) {
		this._armor = armor
	}

	getInfo(): string {
		return `Armor: ${this._armor.name}`
	}

	isFulfilled(char: Character): boolean {
		return char.equipment.getArmors().includes(this._armor)
	}

	apply(char: Character): boolean {
		if (this.isFulfilled(char)) {
			char.equipment.removeArmor(this._armor)
			return true
		}
		else return false
	}

}