import { Ctx } from "../ctx"
import { WordDefinition } from "../definition"
import { CutOptions } from "./cut"
import { cutWords } from "./cutWords"

export function cutWordDefinition(
  ctx: Ctx,
  definition: WordDefinition,
  options: CutOptions,
): void {
  if (definition.words === undefined) {
    throw new Error(
      `[cutWordDefinition] I expect a word definition to have defined words -- word: ${definition.name}`,
    )
  }

  cutWords(definition.mod, ctx, definition.words, options)
  return
}
