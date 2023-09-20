import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { RuleTarget } from "../stmt-next"

export type Rule = {
  mod: Mod
  first: RuleTarget
  second: RuleTarget
  body: Array<BlockStmt>
}
