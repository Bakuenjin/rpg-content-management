import { ArmorManager, AttributeManager, CharacterManager, ItemManager, WeaponManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { items } from "../mocks/items.json"
import { weapons } from "../mocks/weapons.json"
import { armors } from "../mocks/armors.json"
import { characterWithMinimalContent } from "../mocks/characters.json"
import AttributeLevelRequirement from "../../src/requirements/AttributeLevelRequirement"

describe('AttributeLevelRequirement class', () => {

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

	it('checks if the character has the specified attribute level', () => {
		const attribute = attributeManager.getContentById(1)

		if (!attribute) fail('Attribute is not defined.')

		const req = new AttributeLevelRequirement(attribute, 1)
		const char = characterManager.parse(characterWithMinimalContent)

		expect(req.getInfo()).toBe(`${attribute.name} Level: 1`)
		expect(req.isFulfilled(char)).toBe(false)
		expect(req.apply(char)).toBe(false)
		
		char.addExperience(500)
		char.applySkillPoint(attribute)

		expect(req.isFulfilled(char)).toBe(true)
		expect(req.apply(char)).toBe(true)
	})

})