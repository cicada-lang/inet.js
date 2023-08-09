import { Env } from "../env"
import { Node } from "../node"
import { connect } from "../utils/connect"
import { ComposeOptions } from "./compose"

export function composeNode(
  env: Env,
  node: Node,
  options: ComposeOptions,
): Node {
  // Be careful about the order:
  // The first input port connects
  // with the port on the top of the stack.

  for (const port of node.input) {
    const value = env.stack.pop()
    if (value === undefined) {
      throw new Error(`[composeNode] I expect a value on top of the stack.`)
    }

    if (value["@kind"] !== "Port") {
      throw new Error(
        [
          `[composeNode] I expect the top value on the stack to be a Port.`,
          ``,
          `  value['@kind']: ${value["@kind"]}`,
        ].join("\n"),
      )
    }

    connect(env, value, port)
  }

  env.stack.push(...node.output)

  return node
}
