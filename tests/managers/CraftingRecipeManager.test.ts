import { ArmorManager, AttributeManager, CharacterManager, CraftingRecipeManager, ItemManager, WeaponManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { items } from "../mocks/items.json"
import { weapons } from "../mocks/weapons.json"
import { armors } from "../mocks/armors.json"
import { itemRecipes, weaponRecipes, armorRecipes } from "../mocks/recipes.json"
import { Armor, Item, Weapon } from "@bakuenjin/rpg-core"

describe('CraftingRecipeManager class', () => {

	const attributeManager = new AttributeManager(attributes)
	const itemManager = new ItemManager(items)
	const weaponManager = new WeaponManager(attributeManager, weapons)
	const armorManager = new ArmorManager(attributeManager, armors)

	const characterManager = new CharacterManager({
		attributeManager, itemManager,
		weaponManager, armorManager
	})

	const itemRecipeManager = new CraftingRecipeManager<Item>({
		rawRecipes: itemRecipes,
		resultManager: itemManager,
		attributeManager, itemManager,
		weaponManager, armorManager
	})

	const weaponRecipeManager = new CraftingRecipeManager<Weapon>({
		rawRecipes: weaponRecipes,
		resultManager: weaponManager,
		attributeManager, itemManager,
		weaponManager, armorManager
	})

	const armorRecipeManager = new CraftingRecipeManager<Armor>({
		rawRecipes: armorRecipes,
		resultManager: armorManager,
		attributeManager, itemManager,
		weaponManager, armorManager
	})

	it('parses recipes for any class that has a content manager and is identifiable', () => {
		const itemRecipe1 = itemRecipeManager.getContentById(1)
		const weaponRecipe1 = weaponRecipeManager.getContentById(1)
		const armorRecipe1 = armorRecipeManager.getContentById(1)

		if (!itemRecipe1) fail('ItemRecipe is not defined.')
		if (!weaponRecipe1) fail('WeaponRecipe is not defined.')
		if (!armorRecipe1) fail('ArmorRecipe is not defined.')

		expect(itemRecipe1.result).toBe(itemManager.getContentById(5))
		expect(weaponRecipe1.result).toBe(weaponManager.getContentById(1))
		expect(armorRecipe1.result).toBe(armorManager.getContentById(1))
	})

})