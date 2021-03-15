import { ArmorManager, AttributeManager, CharacterManager, ItemManager, WeaponManager } from '../../src'
import { attributes } from '../mocks/attributes.json'
import { items } from '../mocks/items.json'
import { weapons } from '../mocks/weapons.json'
import { armors } from '../mocks/armors.json'
import { characterWithMinimalContent } from '../mocks/characters.json'

describe('CharacterManager class', () => {

	const attributeManager = new AttributeManager(attributes)
	const itemManager = new ItemManager(items)
	const weaponManager = new WeaponManager(attributeManager, weapons)
	const armorManager = new ArmorManager(attributeManager, armors)
	const characterManager = new CharacterManager({
		attributeManager, itemManager,
		weaponManager, armorManager
	})

	it('can create new characters', () => {
		const newChar = characterManager.create(1, 'Player')
		expect(newChar.id).toBe(1)
		expect(newChar.name).toBe('Player')
		expect(newChar.equipment.getCurrentWeapon()).toBeUndefined()
	})

	it('can parse a raw character', () => {
		const parsedChar = characterManager.parse(characterWithMinimalContent)

		expect(parsedChar.id).toBe(1)
		expect(parsedChar.name).toBe('ValidPlayer')
		expect(parsedChar.equipment.getCurrentWeapon()).toBe(weaponManager.getContentById(1))
	})

	it('can serialize a character', () => {
		const parsedChar = characterManager.parse(characterWithMinimalContent)
		const serializedChar = characterManager.serialize(parsedChar)
		const parsedSerializedChar = characterManager.parse(JSON.parse(serializedChar))

		expect(parsedSerializedChar.id).toBe(parsedChar.id)
		expect(parsedSerializedChar.name).toBe(parsedChar.name)
		expect(parsedSerializedChar.getBalance()).toBe(parsedChar.getBalance())
		expect(parsedSerializedChar.getAvailableSkillPoints()).toBe(parsedChar.getAvailableSkillPoints())
		expect(parsedSerializedChar.equipment.getCurrentWeapon()).toBe(parsedChar.equipment.getCurrentWeapon())
		expect(parsedSerializedChar.inventory.asArray().length).toBe(parsedChar.inventory.asArray().length)
	})

})