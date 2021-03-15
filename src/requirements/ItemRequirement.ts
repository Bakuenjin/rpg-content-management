import { Character, IRequirement, Item } from "@bakuenjin/rpg-core";

export default class ItemRequirement implements IRequirement {

	private _item: Item
	private _amount: number

	constructor(item: Item, amount: number) {
		this._item = item
		this._amount = amount
	}

	getInfo(): string {
		return `Item: ${this._item.name} (${this._amount})`
	}

	isFulfilled(char: Character): boolean {
		return char.inventory.hasAmount(this._item, this._amount)
	}

	apply(char: Character): boolean {
		if (this.isFulfilled(char)) {
			char.inventory.remove(this._item, this._amount)
			return true
		}
		else return false
	}

}