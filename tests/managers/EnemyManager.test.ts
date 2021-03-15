import { AttributeManager, EnemyManager, ItemManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { items } from "../mocks/items.json"
import { enemies } from "../mocks/enemies.json"
import { ElementType } from "@bakuenjin/rpg-core"

describe('EnemyManager class', () => {

	it('parses raw enemies', () => {
		const attrManager = new AttributeManager(attributes)
		const itemManager = new ItemManager(items)
		const enemyManager = new EnemyManager(attrManager, itemManager, enemies)
		const enemy = enemyManager.getContentById(1)

		if (!enemy) fail('Enemy is not defined.')

		expect(enemy.id).toBe(1)
		expect(enemy.name).toBe('Small Fire Goblin')
		expect(enemy.element).toBe(ElementType.Fire)
		expect(enemy.level).toBe(10)
		expect(enemyManager.getContents().length).toBe(2)
	})

	it('ignores invalid attributes', () => {
		const rawEnemynWithInvalidAttribute = {
			"id": 1, "name": "Small Fire Goblin",
			"element": 1, "level": 10,
			"rewardHandler": { "balance": 50 },
			"attributes": [
				{ "id": 11, "value": 35 },
				{ "id": 1, "value": 25 },
			]
		}
		const attrManager = new AttributeManager(attributes)
		const itemManager = new ItemManager(items)
		const enemyManager = new EnemyManager(attrManager, itemManager, [ rawEnemynWithInvalidAttribute ])
		const enemy = enemyManager.getContentById(1)

		if (!enemy) fail('Enemy is not defined.')

		const enemyAttributes = enemy.getAttributes()
		expect(enemyAttributes.size).toBe(1)

		const attribute = attrManager.getContentById(1)

		if (!attribute) fail('Attribute is not defined.')
		
		const enemyAttributeValue = enemyAttributes.get(attribute)
		expect(enemyAttributeValue).toBe(25)
	})

})