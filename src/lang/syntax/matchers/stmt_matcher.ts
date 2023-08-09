import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:node": ({ name, input, output }, { span }) =>
      new Stmts.DefineNode(
        pt.str(name),
        matchers.words_matcher(input),
        matchers.words_matcher(output),
        span,
      ),
    "stmt:rule": ({ first, second, words }, { span }) =>
      new Stmts.DefineRule(
        pt.str(first),
        pt.str(second),
        matchers.words_matcher(words),
        span,
      ),
    "stmt:claim": ({ name, input, output }, { span }) =>
      new Stmts.Claim(
        pt.str(name),
        matchers.words_matcher(input),
        matchers.words_matcher(output),
        span,
      ),
    "stmt:define": ({ name, words }, { span }) =>
      new Stmts.Define(pt.str(name), matchers.words_matcher(words), span),
    "stmt:type": ({ name, input, output }, { span }) =>
      new Stmts.DefineType(
        pt.str(name),
        matchers.words_matcher(input),
        matchers.words_matcher(output),
        span,
      ),
    "stmt:begin": ({ words }, { span }) =>
      new Stmts.Begin(matchers.words_matcher(words), span),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
