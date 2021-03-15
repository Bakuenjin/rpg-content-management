import { ArmorManager, AttributeManager, CharacterManager, ItemManager, WeaponManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { items } from "../mocks/items.json"
import { weapons } from "../mocks/weapons.json"
import { armors } from "../mocks/armors.json"
import { characterWithMinimalContent } from "../mocks/characters.json"
import BalanceRequirement from "../../src/requirements/BalanceRequirement"

describe('BalanceRequirement class', () => {

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

	it('checks if the character has enough balance', () => {
		const req = new BalanceRequirement(500)
		const char = characterManager.parse(characterWithMinimalContent)

		expect(req.getInfo()).toBe('Cost: 500')
		expect(req.isFulfilled(char)).toBe(false)
		expect(req.apply(char)).toBe(false)
		
		char.addToBalance(500)
		expect(req.isFulfilled(char)).toBe(true)
		expect(req.apply(char)).toBe(true)
	})

})