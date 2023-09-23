import { manyTimes } from "../../utils/manyTimes"
import { connectValues } from "../connect/connectValues"
import { Env } from "../env"
import { defineLocals } from "../env/defineLocals"
import { EvaluateOptions } from "../evaluate"
import { evaluateBlock } from "../evaluate/evaluateBlock"
import { addEdge } from "../net/addEdge"
import { Function, Value, formatValue } from "../value"
import { formatValues } from "../value/formatValues"

export function applyFunction(
  env: Env,
  target: Function,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  const { mod, input, body } = target.definition

  if (args.length === input.length) {
    const inputNames = input.map((parameter) => parameter.name)
    defineLocals(env, inputNames, args)
    return evaluateBlock(mod, env, body, options)
  }

  if (args.length === input.length + 1) {
    const inputNames = input.map((parameter) => parameter.name)
    const inputArgs = args.slice(0, args.length - 1)
    const lastArg = args[args.length - 1]
    defineLocals(env, inputNames, inputArgs)
    const [value] = evaluateBlock(mod, env, body, options)
    connectValues(env, value, lastArg)
    return []
  }

  if (args.length < input.length) {
    const edges = manyTimes(input.length - args.length, () => addEdge(env.net))
    const inputNames = input.map((parameter) => parameter.name)
    defineLocals(env, inputNames, [...args, ...edges.map((edge) => edge.first)])
    return [
      ...edges.map((edge) => edge.second),
      ...evaluateBlock(mod, env, body, options),
    ]
  }

  throw new Error(
    [
      `[applyFunction] Too many args.`,
      ``,
      `  function: ${formatValue(env, target)}`,
      `  args: [${formatValues(env, args)}]`,
    ].join("\n"),
  )
}
