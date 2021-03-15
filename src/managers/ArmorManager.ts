import { Armor, Attribute } from "@bakuenjin/rpg-core";
import { RawArmor } from "../utils/types";
import ContentManager from "./ContentManager";

export default class ArmorManager extends ContentManager<Armor> {

	constructor(attributeManager: ContentManager<Attribute>, armors: RawArmor[]) {
		super()
		armors.forEach(rawArmor => {

			const attributeValues = new Map<Attribute, number>()

			rawArmor.attributes.forEach(attributeInfo => {
				const attribute = attributeManager.getContentById(attributeInfo.id)
				if (attribute) attributeValues.set(attribute, attributeInfo.value)
			})

			const armor = new Armor(
				rawArmor.id,
				rawArmor.name,
				rawArmor.rarity,
				rawArmor.type,
				rawArmor.element,
				attributeValues
			)
			
			this._contents.set(armor.id, armor)
		})
	}

}