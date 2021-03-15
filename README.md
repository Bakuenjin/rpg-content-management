# RPG-Content-Management

## Table of contents

 * [About](#About)
 * [Installation](#Installation)
 * [Usage](#Usage)

## About

RPG-Content-Management is an implementation for the handling of content for the RPG-Core module.

The management of the following content is provided by this module:

 * Attributes
 * Items, Weapons, Armors
 * Enemies, Dungeons
 * CraftingRecipies for Items, Weapons and Armors
 * Characters

The content is added via JSON Objects and content references each other through their ID.

Because of that, keep in mind the following hierarchy:

1. `Attributes` and `Items` have no dependencies
2. `Weapons` and `Armors` depend on existing `Attributes`
3. `Enemies` depend on existing `Attributes` and `Items`
4. `Dungeons` depend on existing `Enemies` and `Items`
5. `CraftingRecipies` can depend on existing `Attributes`, `Items`, `Weapons` and `Armors`
6. `Characters` depend on existing `Attributes`, `Items`, `Weapons` and `Armors`

## Installation

npm: `npm install @bakuenjin/rpg-content-management`

yarn: `yarn add @bakuenjin/rpg-content-management`

RPG-Content-Management comes with type definitions out of the box, so no additional types package needs to be installed.

## Usage

```ts
import { Item, Weapon, Armor } from '@bakuenjin/rpg-core'

import {
	AttributeManager,
	ItemManager,
	WeaponManager,
	ArmorManager,
	EnemyManager,
	DungeonManager,
	CraftingRecipeManager,
	CharacterManager
} from '@bakuenjin/rpg-content-management'

import { attributes } from './attributes.json'
import { items } from './items.json'
import { weapons } from './weapons.json'
import { armors } from './armors.json'
import { enemies } from './enemies.json'
import { dungeons } from './dungeons.json'
import { itemRecipes, weaponRecipes, armorRecipes } from './recipes.json'
import { existingCharacter } from './characters.json'

// The references between managers will be established via params
const attributeManager = new AttributeManager(attributes)
const itemManager = new ItemManager(items)
const weaponManager = new WeaponManager(attributeManager, weapons)
const armorManager = new ArmorManager(attributeManager, armors)
const enemyManager = new EnemyManager(attributeManager, itemManager, enemies)
const dungeonManager = new DungeonManager(enemyManager, itemManager, dungeons)

const itemRecipeManager	= new CraftingRecipeManager<Item>({
	rawRecipes: itemRecipes,
	resultManager: itemManager,
	attributeManager,
	itemManager,
	weaponManager,
	armorManager
})

const weaponRecipeManager = new CraftingRecipeManager<Weapon>({
	rawRecipes: weaponRecipes,
	resultManager: weaponManager,
	attributeManager,
	itemManager,
	weaponManager,
	armorManager
})

const armorRecipeManager = new CraftingRecipeManager<Armor>({
	rawRecipes: armorRecipes,
	resultManager: armorManager,
	attributeManager,
	itemManager,
	weaponManager,
	armorManager
})

const characterManager	= new CharacterManager({
	attributeManager,
	itemManager,
	weaponManager,
	armorManager
})

// Characters are parsed, created or serialized individually
const character = characterManager.parse(existingCharacter)
const newCharacter = characterManager.create(42, 'Character Name')
const newCharacterAsJSON = characterManager.serialize(newCharacter)
```