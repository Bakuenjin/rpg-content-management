import { Rarity } from "@bakuenjin/rpg-core"
import { ItemManager } from "../../src"
import { items } from "../mocks/items.json"

describe('ItemManager class', () => {

	it('parses raw items', () => {
		const itemManager = new ItemManager(items)
		const item = itemManager.getContentById(1)
		
		if (!item) fail('Item is not defined.')

		expect(item.id).toBe(1)
		expect(item.name).toBe('Old Tree Bark')
		expect(item.rarity).toBe(Rarity.Common)
		expect(itemManager.getContents().length).toBe(17)
	})

})