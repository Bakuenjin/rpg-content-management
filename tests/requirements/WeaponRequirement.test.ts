import { ArmorManager, AttributeManager, CharacterManager, ItemManager, WeaponManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { items } from "../mocks/items.json"
import { weapons } from "../mocks/weapons.json"
import { armors } from "../mocks/armors.json"
import { characterWithMinimalContent } from "../mocks/characters.json"
import ItemRequirement from "../../src/requirements/ItemRequirement"
import WeaponRequirement from "../../src/requirements/WeaponRequirement"

describe('WeaponRequirement class', () => {

	const attributeManager = new AttributeManager(attributes)
	const itemManager = new ItemManager(items)
	const weaponManager = new WeaponManager(attributeManager, weapons)
	const armorManager = new ArmorManager(attributeManager, armors)

	let characterManager: CharacterManager

	beforeEach(() => {
		characterManager = new CharacterManager({
			attributeManager, itemManager,
			weaponManager, armorManager
		})
	})

	it('checks if the character has the specified weapon', () => {
		const weapon = weaponManager.getContentById(1)

		if (!weapon) fail('Attribute is not defined.')

		const req = new WeaponRequirement(weapon)
		const char = characterManager.parse(characterWithMinimalContent)

		expect(req.getInfo()).toBe(`Weapon: ${weapon.name}`)
		expect(req.isFulfilled(char)).toBe(true)
		expect(req.apply(char)).toBe(true)
		
		expect(req.isFulfilled(char)).toBe(false)
		expect(req.apply(char)).toBe(false)
	
	})

})