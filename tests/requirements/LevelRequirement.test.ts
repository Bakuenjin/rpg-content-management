import { ArmorManager, AttributeManager, CharacterManager, ItemManager, WeaponManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { items } from "../mocks/items.json"
import { weapons } from "../mocks/weapons.json"
import { armors } from "../mocks/armors.json"
import { characterWithMinimalContent } from "../mocks/characters.json"
import LevelRequirement from "../../src/requirements/LevelRequirement"

describe('LevelRequirement class', () => {

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

	it('checks if the character has a sufficient level', () => {
		const unfulfilledReq = new LevelRequirement(2)
		const fulfilledReq = new LevelRequirement(1)
		const char = characterManager.parse(characterWithMinimalContent)

		expect(unfulfilledReq.getInfo()).toBe('Level: 2')
		expect(unfulfilledReq.isFulfilled(char)).toBe(false)
		expect(fulfilledReq.isFulfilled(char)).toBe(true)
		expect(unfulfilledReq.apply(char)).toBe(false)
		expect(fulfilledReq.apply(char)).toBe(true)
	})

})