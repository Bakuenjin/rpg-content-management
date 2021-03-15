import { ElementType, Rarity, WeaponType } from "@bakuenjin/rpg-core"
import { AttributeManager, WeaponManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { weapons } from "../mocks/weapons.json"

describe('WeaponManager class', () => {

	it('parses raw weapons', () => {
		const attrManager = new AttributeManager(attributes)
		const weaponManager = new WeaponManager(attrManager, weapons)
		const weapon = weaponManager.getContentById(1)

		if (!weapon) fail('Weapon is not defined.')

		expect(weapon.id).toBe(1)
		expect(weapon.name).toBe('Small Dagger')
		expect(weapon.rarity).toBe(Rarity.Common)
		expect(weapon.type).toBe(WeaponType.Sword)
		expect(weapon.element).toBe(ElementType.None)
		expect(weaponManager.getContents().length).toBe(2)
	})

	it('ignores invalid attributes', () => {
		const rawWeaponWithInvalidAttribute = {
			"id": 1, "name": "Small Dagger",
			"rarity": 1, "type": 1,
			"element": 1,
			"attributes": [
				{ "id": 11, "value": 35 },
				{ "id": 1, "value": 25 },
			]
		}
		const attrManager = new AttributeManager(attributes)
		const weaponManager = new WeaponManager(attrManager, [ rawWeaponWithInvalidAttribute ])
		const weapon = weaponManager.getContentById(1)

		if (!weapon) fail('Weapon is not defined.')

		const weaponAttributes = weapon.getAttributes()
		expect(weaponAttributes.size).toBe(1)

		const attribute = attrManager.getContentById(1)

		if (!attribute) fail('Attribute is not defined.')
		
		const weaponAttributeValue = weaponAttributes.get(attribute)
		expect(weaponAttributeValue).toBe(25)
	})

})