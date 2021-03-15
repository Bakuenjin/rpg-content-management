import { AttributeManager } from "../../src"
import { attributes } from "../mocks/attributes.json"

describe('AttributeManager class', () => {

	it('parses raw attributes', () => {
		const attrManager = new AttributeManager(attributes)
		const attr = attrManager.getContentById(1)

		if (!attr) fail('Attribute is not defined.')

		expect(attr.id).toBe(1)
		expect(attr.name).toBe('HP')
		expect(attr.getIncreaseRate(1)).toBe(50)
		expect(attr.getIncreaseRate(2)).toBe(14)
		expect(attrManager.getContents().length).toBe(4)
	})

})