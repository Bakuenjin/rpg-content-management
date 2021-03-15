import { ItemManager, RewardHandlerUtils, Types as RpgCMTypes } from "../../src"
import { items } from "../mocks/items.json"

describe('RewardHandlerUtils class', () => {

	const itemManager = new ItemManager(items)

	it('can parse a raw reward handler with fixed loot', () => {
		const rawRewardHandler: RpgCMTypes.RawRewardHandler = {
			itemDropAmounts: [
				{ id: 1, amount: 2 },
				{ id: 2, amount: 1 }
			],
			balance: 50
		}

		const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawRewardHandler)
		const reward = rewardHandler.generateReward()
		const rewardInvLength = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)
		expect(rewardInvLength).toBe(3)
		expect(reward.balance).toBe(50)
	})

	it('skips invalid items when parsing fixed loot reward handler', () => {
		const rawRewardHandler: RpgCMTypes.RawRewardHandler = {
			itemDropAmounts: [
				{ id: 1, amount: 2 },
				{ id: 200, amount: 1 }
			],
			balance: 50
		}

		const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawRewardHandler)
		const reward = rewardHandler.generateReward()
		const rewardInvLength = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)
		expect(rewardInvLength).toBe(2)
	})

	it('can parse a raw reward handler with randomized loot and loot amount', () => {
		const rawRewardHandler: RpgCMTypes.RawRewardHandler = {
			itemDropChances: [
				{ id: 1, weight: 5 },
				{ id: 2, weight: 3 }
			],
			lootAmount: { min: 5, max: 10 },
			balance: 50
		}

		const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawRewardHandler)
		const reward = rewardHandler.generateReward()
		const rewardInvLength = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)
		expect(rewardInvLength).toBeGreaterThanOrEqual(5)
		expect(rewardInvLength).toBeLessThan(10)
		expect(reward.balance).toBe(50)
	})

	it('defaults to a loot amount of 1 if no amount is specified', () => {
		const rawRewardHandler: RpgCMTypes.RawRewardHandler = {
			itemDropChances: [
				{ id: 1, weight: 5 },
				{ id: 2, weight: 3 }
			],
			balance: 50
		}

		const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawRewardHandler)
		const reward = rewardHandler.generateReward()
		const rewardInvLength = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)
		expect(rewardInvLength).toBe(1)
	})

	it('skips invalid items when parsing randomized loot reward handler', () => {
		const rawRewardHandler: RpgCMTypes.RawRewardHandler = {
			itemDropChances: [
				{ id: 1, weight: 1 },
				{ id: 200, weight: 1000000000 }
			],
			balance: 50
		}

		const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawRewardHandler)
		const reward = rewardHandler.generateReward()
		expect(reward.inventory.asArray()[0].item.id).toBe(1)
	})

	it('can parse a raw reward handler with no loot', () => {
		const rawRewardHandler: RpgCMTypes.RawRewardHandler = {
			balance: 42
		}

		const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawRewardHandler)
		const reward = rewardHandler.generateReward()
		const rewardInvLength = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)
		expect(rewardInvLength).toBe(0)
	})

})