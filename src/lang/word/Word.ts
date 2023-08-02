import { Node } from "../graph"
import { Mod } from "../mod"
import { Net } from "../net"
import { Span } from "../span"

export interface ComposeOptions {
  current?: { start: Node; end: Node }
}

export interface Word {
  span: Span
  compose(mod: Mod, net: Net, options?: ComposeOptions): void
}
