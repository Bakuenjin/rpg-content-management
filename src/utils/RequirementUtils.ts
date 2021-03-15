import { IRequirement } from '@bakuenjin/rpg-core'
import ArmorRequirement from '../requirements/ArmorRequirement';
import AttributeLevelRequirement from '../requirements/AttributeLevelRequirement';
import BalanceRequirement from '../requirements/BalanceRequirement';
import ItemRequirement from '../requirements/ItemRequirement';
import LevelRequirement from '../requirements/LevelRequirement';
import RequirementType from '../requirements/RequirementType';
import WeaponRequirement from '../requirements/WeaponRequirement';
import { ParseRawRequirementOptions } from "./types";

const REQUIREMENT_PARSER: { [key in keyof typeof RequirementType]: (options: ParseRawRequirementOptions) => IRequirement | undefined } = {
	Balance: ({ rawRequirement }) => {
		return rawRequirement.value ?
			new BalanceRequirement(rawRequirement.value) :
			undefined
	},
	Level: ({ rawRequirement }) => {
		return rawRequirement.value ?
			new LevelRequirement(rawRequirement.value) :
			undefined
	},
	AttributeLevel: ({ attributeManager, rawRequirement }) => {
		if (!rawRequirement.id || !rawRequirement.value)
			return

		const attribute = attributeManager.getContentById(rawRequirement.id)

		if (!attribute)
			return

		return new AttributeLevelRequirement(attribute, rawRequirement.value)
	},
	Item: ({ itemManager, rawRequirement }) => {
		if (!rawRequirement.id || !rawRequirement.value)
			return

		const item = itemManager.getContentById(rawRequirement.id)

		if (!item)
			return

		return new ItemRequirement(item, rawRequirement.value)
	},
	Weapon: ({ weaponManager, rawRequirement }) => {
		if (!rawRequirement.id)
			return

		const weapon = weaponManager.getContentById(rawRequirement.id)

		if (!weapon)
			return

		return new WeaponRequirement(weapon)
	},
	Armor: ({ armorManager, rawRequirement }) => {
		if (!rawRequirement.id)
			return

		const armor = armorManager.getContentById(rawRequirement.id)

		if (!armor)
			return

		return new ArmorRequirement(armor)
	}
}

class RequirementUtils {

	parseRawRequirement(options: ParseRawRequirementOptions): IRequirement | undefined {
		const parser = REQUIREMENT_PARSER[<RequirementType>options.rawRequirement.type]
		return parser ? parser(options) : undefined
	}

}

export default new RequirementUtils()