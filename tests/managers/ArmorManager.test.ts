import { ArmorType, ElementType, Rarity } from "@bakuenjin/rpg-core"
import { AttributeManager, ArmorManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { armors } from "../mocks/armors.json"

describe('WeaponManager class', () => {

	it('parses raw armors', () => {
		const attrManager = new AttributeManager(attributes)
		const armorManager = new ArmorManager(attrManager, armors)
		const armor = armorManager.getContentById(1)

		if (!armor) fail('Armor is not defined.')

		expect(armor.id).toBe(1)
		expect(armor.name).toBe('Thin Leatherboots')
		expect(armor.rarity).toBe(Rarity.Common)
		expect(armor.type).toBe(ArmorType.Boot)
		expect(armor.element).toBe(ElementType.None)
		expect(armorManager.getContents().length).toBe(2)
	})

	it('ignores invalid attributes', () => {
		const rawArmorWithInvalidAttribute = {
			"id": 1, "name": "Small Dagger",
			"rarity": 1, "type": 1,
			"element": 1,
			"attributes": [
				{ "id": 11, "value": 35 },
				{ "id": 1, "value": 25 },
			]
		}
		const attrManager = new AttributeManager(attributes)
		const armorManager = new ArmorManager(attrManager, [ rawArmorWithInvalidAttribute ])
		const armor = armorManager.getContentById(1)

		if (!armor) fail('Armor is not defined.')

		const armorAttributes = armor.getAttributes()
		expect(armorAttributes.size).toBe(1)

		const attribute = attrManager.getContentById(1)

		if (!attribute) fail('Attribute is not defined.')
		
		const armorAttributeValue = armorAttributes.get(attribute)
		expect(armorAttributeValue).toBe(25)
	})

})