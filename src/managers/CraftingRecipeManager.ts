import { CraftingRecipe, Identifiable, IRequirement } from "@bakuenjin/rpg-core";
import RequirementUtils from "../utils/RequirementUtils";
import { CraftingRecipeManagerOptions } from "../utils/types";
import ContentManager from "./ContentManager";

export default class CraftingRecipeManager<T extends Identifiable> extends ContentManager<CraftingRecipe<T>> {

	constructor(options: CraftingRecipeManagerOptions<T>) {
		super()
		options.rawRecipes.forEach(rawRecipe => {
			const result = options.resultManager.getContentById(rawRecipe.result)
			if (!result) return

			const requirements: IRequirement[] = []

			rawRecipe.requirements.forEach(rawReq => {
				const req = RequirementUtils.parseRawRequirement({
					rawRequirement: rawReq,
					...options
				})

				if (req) requirements.push(req)
			})

			const recipe = new CraftingRecipe<typeof result>(rawRecipe.id, result, requirements)
			this._contents.set(recipe.id, recipe)
		})
	}

}