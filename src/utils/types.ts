import { Armor, Attribute, Identifiable, Item, Types as RpgCoreTypes, Weapon } from "@bakuenjin/rpg-core"
import ContentManager from "../managers/ContentManager"

export type RawAttribute = {
	id: number
	name: string
	baseValue: number
	increaseRate: number | string
}

export type RawAttributeValue = {
	id: number
	value: number
}

export type RawAttributeInfo = {
	id: number
	level: number
	value: number
}

export type RawItem = {
	id: number
	name: string
	rarity: number
}

export type RawItemAmount = {
	id: number
	amount: number
}

export type RawItemDropChance = {
	id: number
	weight: number
}

export type RawWeapon = RawItem & {
	type: number
	element: number,
	attributes: RawAttributeValue[]
}

export type RawArmor = RawItem & {
	type: number
	element: number
	attributes: RawAttributeValue[]
}

export type RawRewardHandler = {
	itemDropChances?: RawItemDropChance[]
	itemDropAmounts?: RawItemAmount[]
	lootAmount?: number | RpgCoreTypes.NumberRange
	balance: number | RpgCoreTypes.NumberRange
	experience?: number | RpgCoreTypes.NumberRange
}

export type RawEnemy = {
	id: number
	name: string
	element: number
	level: number
	attributes: RawAttributeValue[]
	rewardHandler: RawRewardHandler
}

export type RawStage = {
	enemies: number[]
	rewardHandler: RawRewardHandler
}

export type RawDungeon = {
	id: number
	name: string
	rewardHandler: RawRewardHandler
	stages: RawStage[]
}

export type RawCharacter = {
	id: number
	name: string
	level?: number
	experience?: number
	attributes?: RawAttributeInfo[]
	skillPoints?: number
	balance?: number
	inventory?: RawItemAmount[]
	weapons?: number[]
	armors?: number[]
	currentWeapon?: number
	currentArmor?: number[]
}

export type CharacterManagerOptions = {
	attributeManager: ContentManager<Attribute>
	itemManager: ContentManager<Item>
	weaponManager: ContentManager<Weapon>
	armorManager: ContentManager<Armor>
}

export type RawRequirement = {
	type: string
	id?: number
	value?: number
}

export type RawCraftingRecipe = {
	id: number
	result: number
	requirements: RawRequirement[]
}

export type CraftingRecipeManagerOptions<T extends Identifiable> = {
	rawRecipes: RawCraftingRecipe[]
	resultManager: ContentManager<T>
	attributeManager: ContentManager<Attribute>
	itemManager: ContentManager<Item>
	weaponManager: ContentManager<Weapon>
	armorManager: ContentManager<Armor>
}

export type ParseRawRequirementOptions = CharacterManagerOptions & {
	rawRequirement: RawRequirement
}