import { Item, RewardHandler, Types as RpgCoreTypes } from "@bakuenjin/rpg-core";
import ItemManager from "../managers/ItemManager";
import { RawRewardHandler } from "./types";

class RewardHandlerUtils {

	parseRawRewardHandler(itemManager: ItemManager, rawRewardHandler: RawRewardHandler): RewardHandler {

		// Fixed Loot Reward Handler
		if (rawRewardHandler.itemDropAmounts) {
			const loot = new Map<Item, number>()
			rawRewardHandler.itemDropAmounts.forEach(itemDrop => {
				const item = itemManager.getContentById(itemDrop.id)
				if (item) loot.set(item, itemDrop.amount)
			})

			return new RewardHandler({
				loot: loot, lootAmount: 0,
				balance: rawRewardHandler.balance,
				experience: rawRewardHandler.experience
			})
		}
		// Randomized Loot Reward Handler
		else if (rawRewardHandler.itemDropChances) {
			const loot: RpgCoreTypes.ItemDropChance[] = []

			rawRewardHandler.itemDropChances.forEach(itemDrop => {
				const item = itemManager.getContentById(itemDrop.id)
				if (item) loot.push({ item, weight: itemDrop.weight })
			})

			const lootAmount = rawRewardHandler.lootAmount ?
				rawRewardHandler.lootAmount : 1

			return new RewardHandler({
				loot, lootAmount,
				balance: rawRewardHandler.balance,
				experience: rawRewardHandler.experience
			})
		}
		// No Loot Reward Handler
		else {
			return new RewardHandler({
				loot: new Map<Item, number>(),
				lootAmount: 0,
				balance: rawRewardHandler.balance,
				experience: rawRewardHandler.experience
			})
		}

	}

}

export default new RewardHandlerUtils()