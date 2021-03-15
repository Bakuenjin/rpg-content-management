import { Item } from "@bakuenjin/rpg-core";
import { RawItem } from "../utils/types";
import ContentManager from "./ContentManager";

export default class ItemManager extends ContentManager<Item> {

	constructor(items: RawItem[]) {
		super()
		items.forEach(rawItem => {
			const item = new Item(rawItem.id, rawItem.name, rawItem.rarity)
			this._contents.set(item.id, item)
		})
	}

}