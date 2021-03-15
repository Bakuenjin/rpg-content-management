import { Attribute, Character, IRequirement } from "@bakuenjin/rpg-core";

export default class AttributeLevelRequirement implements IRequirement {

	private _attribute: Attribute
	private _level: number

	constructor(attribute: Attribute, level: number) {
		this._attribute = attribute
		this._level = level
	}

	getInfo(): string {
		return `${this._attribute.name} Level: ${this._level}`
	}

	isFulfilled(char: Character): boolean {
		const attributeInfo = char.getCharacterStats().get(this._attribute)
		if (!attributeInfo)
			return false

		return attributeInfo.level >= this._level
	}

	apply(char: Character): boolean {
		return this.isFulfilled(char)
	}

}