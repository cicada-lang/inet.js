import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { ParameterWithoutType } from "../stmt/Parameter"

export type RuleTarget = {
  name: string
  parameters: Array<ParameterWithoutType>
}

export type Rule = {
  mod: Mod
  first: RuleTarget
  second: RuleTarget
  body: Array<BlockStmt>
}
