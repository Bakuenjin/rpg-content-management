import { Dungeon, Enemy, Item, Stage } from "@bakuenjin/rpg-core";
import RewardHandlerUtils from "../utils/RewardHandlerUtils";
import { RawDungeon } from "../utils/types";
import ContentManager from "./ContentManager";

export default class DungeonManager extends ContentManager<Dungeon> {

	constructor(enemyManager: ContentManager<Enemy>, itemManager: ContentManager<Item>, dungeons: RawDungeon[]) {
		super()
		dungeons.forEach(rawDungeon => {
			const stages = rawDungeon.stages.map(stage => {

				const enemies: Enemy[] = []

				stage.enemies.forEach(enemyId => {
					const enemy = enemyManager.getContentById(enemyId)
					if (enemy) enemies.push(enemy)
				})

				const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, stage.rewardHandler)
				return new Stage(enemies, rewardHandler)

			})

			const rewardHandler = RewardHandlerUtils.parseRawRewardHandler(itemManager, rawDungeon.rewardHandler)

			const dungeon = new Dungeon({
				id: rawDungeon.id,
				name: rawDungeon.name,
				stages: stages,
				rewardHandler: rewardHandler
			})

			this._contents.set(dungeon.id, dungeon)
		})
	}

}