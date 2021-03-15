import { Character, IRequirement, Weapon } from "@bakuenjin/rpg-core";

export default class WeaponRequirement implements IRequirement {

	private _weapon: Weapon

	constructor(weapon: Weapon) {
		this._weapon = weapon
	}

	getInfo(): string {
		return `Weapon: ${this._weapon.name}`
	}

	isFulfilled(char: Character): boolean {
		return char.equipment.getWeapons().includes(this._weapon)
	}

	apply(char: Character): boolean {
		if (this.isFulfilled(char)) {
			char.equipment.removeWeapon(this._weapon)
			return true
		}
		else return false
	}

}