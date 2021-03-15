import { Identifiable } from '@bakuenjin/rpg-core'

export default abstract class ContentManager<T extends Identifiable> {

	protected _contents: Map<number, T>

	constructor() {
		this._contents = new Map<number, T>()
	}

	getContents(): T[] {
		return Array.from(this._contents.values())
	}

	getContentById(id: number): T | undefined {
		return this._contents.get(id)
	}

}