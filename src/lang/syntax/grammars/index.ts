import * as pt from "@cicada-lang/partech"

export const zero_or_more = pt.grammars.zero_or_more
export const one_or_more = pt.grammars.one_or_more
export const optional = pt.grammars.optional
export const dashline = pt.grammars.dashline

export * from "./arg"
export * from "./block_stmt"
export * from "./exp"
export * from "./import_binding"
export * from "./name"
export * from "./parameter"
export * from "./rule_target"
export * from "./stmt"
