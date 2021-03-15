import { Attribute } from "@bakuenjin/rpg-core";
import { RawAttribute } from "../utils/types";
import ContentManager from "./ContentManager";

export default class AttributeManager extends ContentManager<Attribute>{

	constructor(attributes: RawAttribute[]) {
		super()
		attributes.forEach(rawAttr => {
			const attr = new Attribute(rawAttr.id, rawAttr.name, rawAttr.baseValue, rawAttr.increaseRate)
			this._contents.set(attr.id, attr)
		})
	}

}