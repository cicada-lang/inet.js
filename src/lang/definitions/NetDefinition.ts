import { composeWords } from "../compose/composeWords"
import { Definition } from "../definition"
import { Mod } from "../mod"
import { Net } from "../net"
import { Word } from "../word"

export class NetDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public words: Array<Word>,
  ) {}

  compose(net: Net): void {
    composeWords(this.mod, net, this.words)
  }
}
