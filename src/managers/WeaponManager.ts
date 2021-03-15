import { Attribute, Weapon } from "@bakuenjin/rpg-core";
import { RawWeapon } from "../utils/types";
import ContentManager from "./ContentManager";

export default class WeaponManager extends ContentManager<Weapon> {

	constructor(attributeManager: ContentManager<Attribute>, weapons: RawWeapon[]) {
		super()
		weapons.forEach(rawWeapon => {
			
			const attributeValues = new Map<Attribute, number>()

			rawWeapon.attributes.forEach(attributeInfo => {
				const attribute = attributeManager.getContentById(attributeInfo.id)
				if (attribute) attributeValues.set(attribute, attributeInfo.value)
			})

			const weapon = new Weapon(
				rawWeapon.id,
				rawWeapon.name,
				rawWeapon.rarity,
				rawWeapon.type,
				rawWeapon.element,
				attributeValues
			)

			this._contents.set(weapon.id, weapon)

		})
	}

}