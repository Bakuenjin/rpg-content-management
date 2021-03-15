import { Armor, ArmorType, Attribute, Character, Item, Types as RpgCoreTypes, Weapon } from "@bakuenjin/rpg-core";
import CharacterManagerUtils from "../utils/CharacterManagerUtils";
import { CharacterManagerOptions, RawCharacter } from "../utils/types";
import ContentManager from "./ContentManager";

export default class CharacterManager {

	private _attributes: ContentManager<Attribute>
	private _items: ContentManager<Item>
	private _weapons: ContentManager<Weapon>
	private _armors: ContentManager<Armor>

	constructor(options: CharacterManagerOptions) {
		this._attributes = options.attributeManager
		this._items = options.itemManager
		this._weapons = options.weaponManager
		this._armors = options.armorManager
	}

	create(id: number, name: string): Character {
		return new Character({ id, name })
	}

	parse(character: RawCharacter): Character {
		const attributes = new Map<Attribute, RpgCoreTypes.AttributeInfo>()
		const inventory = new Map<Item, number>()
		const weapons: Weapon[] = []
		const armors: Armor[] = []
		const currentWeapon = character.currentWeapon ?
			this._weapons.getContentById(character.currentWeapon) : undefined
		const currentArmor = new Map<ArmorType, Armor>()

		if (character.attributes) {
			character.attributes.forEach(({ id, level, value }) => {
				const attribute = this._attributes.getContentById(id)
				if (attribute) attributes.set(attribute, { level, value })
			})
		}

		if (character.inventory) {
			character.inventory.forEach(({ id, amount }) => {
				const item = this._items.getContentById(id)
				if (item) inventory.set(item, amount)
			})
		}

		if (character.weapons) {
			character.weapons.forEach(id => {
				const weapon = this._weapons.getContentById(id)
				if (weapon) weapons.push(weapon)
			})
		}

		if (character.armors) {
			character.armors.forEach(id => {
				const armor = this._armors.getContentById(id)
				if (armor) armors.push(armor)
			})
		}


		if (!currentWeapon || !weapons.includes(currentWeapon))
			throw new Error(`The current weapon with ID ${character.currentWeapon} is not defined.`)

		if (character.currentArmor) {
			character.currentArmor.forEach(id => {
				const armor = this._armors.getContentById(id)
				if (!armor ||!armors.includes(armor)) throw new Error(`The current armor with ID ${id} is not defined.`)
				currentArmor.set(armor.type, armor)
			})
		}
		
		return new Character({
			id: character.id,
			name: character.name,
			level: character.level,
			experience: character.experience,
			skillPoints: character.skillPoints,
			attributes, inventory,
			weapons, armors,
			currentWeapon,
			currentArmor
		})
	}

	serialize(character: Character): string {
		const { level, currentExp } = character.getLevelInfo()
		const attributes 	= CharacterManagerUtils.exportCharacterStats(character.getCharacterStats())
		const inventory 	= CharacterManagerUtils.exportInventoryItems(character.inventory.asArray())
		const weapons 		= CharacterManagerUtils.exportWeapons(character.equipment.getWeapons())
		const armors 		= CharacterManagerUtils.exportArmors(character.equipment.getArmors())
		const currentArmor 	= CharacterManagerUtils.exportCurrentArmor(character.equipment.getCurrentArmor())
		const currentWeapon = character.equipment.getCurrentWeapon()

		const rawCharacter: RawCharacter = {
			id: character.id,
			name: character.name,
			experience: currentExp,
			level, attributes,
			skillPoints: character.getAvailableSkillPoints(),
			balance: character.getBalance(),
			currentWeapon: currentWeapon ? currentWeapon.id : undefined,
			inventory, weapons,
			armors,	currentArmor
		}

		return JSON.stringify(rawCharacter)
	}

}