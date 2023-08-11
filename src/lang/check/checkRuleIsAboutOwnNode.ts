import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"

export function checkRuleIsAboutOwnNode(
  mod: Mod,
  firstName: string,
  secondName: string,
): void {
  const first = lookupDefinitionOrFail(mod, firstName)
  const second = lookupDefinitionOrFail(mod, secondName)

  if (
    first.mod.url.href !== mod.url.href &&
    second.mod.url.href !== mod.url.href
  ) {
    throw new Error(
      [
        `[checkRuleIsAboutOwnNode] To define a rule, one of the node must be owned by this module.`,
        ``,
        `  loading module url: ${mod.url.href}`,
        `  first node module url: ${first.mod.url.href}`,
        `  second node module url: ${second.mod.url.href}`,
      ].join("\n"),
    )
  }
}
