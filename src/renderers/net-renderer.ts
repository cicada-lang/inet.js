import { Net } from "../lang/net"
import { DotRenderer } from "./dot-renderer"

export class NetRenderer {
  dotRenderer = new DotRenderer()

  async render(net: Net): Promise<string> {
    const dot = this.renderToDot(net)
    return await this.dotRenderer.render(dot)
  }

  renderToDot(net: Net): string {
    const lines: Array<string> = []

    for (const edge of net.edges) {
      const start = `${edge.start.node.name}#${edge.start.node.id}`
      const end = `${edge.end.node.name}#${edge.end.node.id}`
      lines.push(`"${start}" -- "${end}";\n`)
    }

    for (const edge of net.actions) {
      const start = `${edge.start.node.name}#${edge.start.node.id}`
      const end = `${edge.end.node.name}#${edge.end.node.id}`
      lines.push(`"${start}" -- "${end}" [color=red];\n`)
    }

    const body = lines.join(" ")

    return `graph { ${body} }`
  }
}
