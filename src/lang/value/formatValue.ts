import { type Env } from "../env/index.ts"
import { formatHalfEdge } from "../half-edge/formatHalfEdge.ts"
import { formatNode } from "../node/formatNode.ts"
import { type Value } from "./Value.ts"

export function formatValue(env: Env, value: Value): string {
  switch (value["@kind"]) {
    case "HalfEdge": {
      return formatHalfEdge(env.net, value)
    }

    case "Node": {
      return `(${formatNode(env.net, value)})`
    }

    case "Function": {
      return `#Function(${value.definition.name})`
    }

    case "PrimitiveFunction": {
      return `#PrimitiveFunction(${value.definition.name})`
    }

    case "TypeCtor": {
      return `#TypeCtor(${value.definition.name})`
    }

    case "Type": {
      return "Type"
    }

    case "Symbol": {
      return `'${value.name}`
    }

    case "TypeTerm": {
      if (value.args.length === 0) {
        return `${value.name}`
      } else {
        const args = [...value.args]
          .reverse()
          .map((arg) => formatValue(env, arg))
          .join(" ")

        return `${args} ${value.name}`
      }
    }
  }
}
