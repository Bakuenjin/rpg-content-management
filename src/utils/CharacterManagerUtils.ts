import { Armor, ArmorType, Attribute, Types as RpgCoreTypes, Weapon } from "@bakuenjin/rpg-core";
import { RawAttributeInfo, RawItemAmount } from "./types";

class CharacterManagerUtils {

	exportCharacterStats(attributes: Map<Attribute, RpgCoreTypes.AttributeInfo>): RawAttributeInfo[] {
		const rawAttributeInfos: RawAttributeInfo[] = []
		
		attributes.forEach((info, attribute) => {
			rawAttributeInfos.push({
				id: attribute.id,
				level: info.level,
				value: info.value
			})
		})

		return rawAttributeInfos
	}

	exportInventoryItems(itemInfos: RpgCoreTypes.InventoryItemInfo[]): RawItemAmount[] {
		return itemInfos.map(itemInfo => ({
			id: itemInfo.item.id,
			amount: itemInfo.amount
		}))
	}

	exportWeapons(weapons: Weapon[]): number[] {
		return weapons.map(weapon => weapon.id)
	}

	exportArmors(armors: Armor[]): number[] {
		return armors.map(armor => armor.id)
	}

	exportCurrentArmor(armor: Map<ArmorType, Armor>): number[] {
		const rawArmor: number[] = []

		armor.forEach(armor => {
			rawArmor.push(armor.id)
		})

		return rawArmor
	}

}

export default new CharacterManagerUtils()