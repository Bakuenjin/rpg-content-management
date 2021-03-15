import { Attribute, Enemy, Item } from "@bakuenjin/rpg-core";
import RewardHandlerUtils from "../utils/RewardHandlerUtils";
import { RawEnemy } from "../utils/types";
import ContentManager from "./ContentManager";

export default class EnemyManager extends ContentManager<Enemy> {

	constructor(attributeManager: ContentManager<Attribute>, itemManager: ContentManager<Item>, enemies: RawEnemy[]) {
		super()
		enemies.forEach(rawEnemy => {

			const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawEnemy.rewardHandler)
			const attributeValues = new Map<Attribute, number>()

			rawEnemy.attributes.forEach(attributeInfo => {
				const attribute = attributeManager.getContentById(attributeInfo.id)
				if (attribute) attributeValues.set(attribute, attributeInfo.value)
			})

			const enemy = new Enemy({
				id: rawEnemy.id,
				name: rawEnemy.name,
				element: rawEnemy.element,
				level: rawEnemy.level,
				rewardHandler: rewardHandler,
				attributes: attributeValues,
			})

			this._contents.set(enemy.id, enemy)

		})
	}

}