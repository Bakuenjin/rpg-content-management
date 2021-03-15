import { RequirementType } from "../../src"

describe('RequirementType enum', () => {

	it('is a string enum', () => {
		expect(RequirementType.Balance).toBe('Balance')
		expect(RequirementType.Level).toBe('Level')
		expect(RequirementType.AttributeLevel).toBe('AttributeLevel')
		expect(RequirementType.Item).toBe('Item')
		expect(RequirementType.Weapon).toBe('Weapon')
		expect(RequirementType.Armor).toBe('Armor')
	})

})