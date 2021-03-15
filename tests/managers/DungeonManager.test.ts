import { AttributeManager, DungeonManager, EnemyManager, ItemManager } from "../../src"
import { attributes } from "../mocks/attributes.json"
import { items } from "../mocks/items.json"
import { enemies } from "../mocks/enemies.json"
import { dungeons } from "../mocks/dungeons.json"

describe('DungeonManager class', () => {

	it('parses raw dungeons', () => {
		const attributeManager = new AttributeManager(attributes)
		const itemManager = new ItemManager(items)
		const enemyManager = new EnemyManager(attributeManager, itemManager, enemies)
		const dungeonManager = new DungeonManager(enemyManager, itemManager, dungeons)
		const dungeon = dungeonManager.getContentById(1)

		if (!dungeon) fail('Dungeon is not defined.')

		expect(dungeon.id).toBe(1)
		expect(dungeon.name).toBe('Forest Shrine')
	})

	it('ignores invalid enemies', () => {
		const rawDungeonWithInvalidEnemy = {
			id: 1, name: 'Forest Shrine',
			rewardHandler: { balance: 0 },
			stages: [
				{
					enemies: [ 2, 50, 1],
					rewardHandler: { balance: 0 }
				}
			]
		}

		const attributeManager = new AttributeManager(attributes)
		const itemManager = new ItemManager(items)
		const enemyManager = new EnemyManager(attributeManager, itemManager, enemies)
		const dungeonManager = new DungeonManager(enemyManager, itemManager, [ rawDungeonWithInvalidEnemy ])
		const dungeon = dungeonManager.getContentById(1)

		if (!dungeon) fail('Dungeon is not defined.')
		
		const enemyPool = dungeon.getEnemyPool()
		expect(enemyPool.length).toBe(2)
		expect(enemyPool[0].id).toBe(2)
		expect(enemyPool[1].id).toBe(1)
	})

})